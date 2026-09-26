const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET all stock movements
router.get("/", (req, res) => {
    const sql = `
        SELECT
            sm.id,
            sm.product_id,
            p.name AS product_name,
            sm.supplier_id,
            sm.movement_type,
            sm.quantity,
            sm.from_warehouse,
            sm.to_warehouse,
            sm.status,
            sm.created_at
        FROM stock_movements sm
        JOIN products p ON sm.product_id = p.id
        ORDER BY sm.created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching stock movements:", err);
            return res.status(500).json({
                message: "Failed to fetch stock movements"
            });
        }

        res.json(results);
    });
});

// GET one stock movement
router.get("/:id", (req, res) => {
    const sql = `
        SELECT
            sm.id,
            sm.product_id,
            p.name AS product_name,
            sm.supplier_id,
            sm.movement_type,
            sm.quantity,
            sm.from_warehouse,
            sm.to_warehouse,
            sm.status,
            sm.created_at
        FROM stock_movements sm
        JOIN products p ON sm.product_id = p.id
        WHERE sm.id = ?
    `;

    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error("Error fetching stock movement:", err);
            return res.status(500).json({
                message: "Failed to fetch stock movement"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Stock movement not found"
            });
        }

        res.json(results[0]);
    });
});

// CREATE stock movement
router.post("/", (req, res) => {
    const {
        product_id,
        supplier_id,
        movement_type,
        quantity,
        from_warehouse,
        to_warehouse,
        status
    } = req.body;

    const validTypes = [
        "receipt",
        "delivery",
        "transfer",
        "adjustment"
    ];

    if (!product_id || !movement_type || !quantity) {
        return res.status(400).json({
            message: "product_id, movement_type and quantity are required"
        });
    }

    if (!validTypes.includes(movement_type)) {
        return res.status(400).json({
            message: "Invalid movement type"
        });
    }

    if (quantity <= 0) {
        return res.status(400).json({
            message: "Quantity must be greater than 0"
        });
    }

    const movementStatus = status || "draft";

    // Check product
    const productSql = `
        SELECT id, name, stock, warehouse_id
        FROM products
        WHERE id = ?
    `;

    db.query(productSql, [product_id], (err, products) => {
        if (err) {
            console.error("Error checking product:", err);
            return res.status(500).json({
                message: "Failed to check product"
            });
        }

        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const product = products[0];

        // Check delivery stock
        if (
            movement_type === "delivery" &&
            movementStatus === "done" &&
            product.stock < quantity
        ) {
            return res.status(400).json({
                message: "Insufficient stock",
                currentStock: product.stock,
                requestedQuantity: quantity
            });
        }

        // Insert movement
        const insertSql = `
            INSERT INTO stock_movements
            (
                product_id,
                supplier_id,
                movement_type,
                quantity,
                from_warehouse,
                to_warehouse,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            insertSql,
            [
                product_id,
                supplier_id || null,
                movement_type,
                quantity,
                from_warehouse || null,
                to_warehouse || null,
                movementStatus
            ],
            (err, result) => {
                if (err) {
                    console.error("Error creating stock movement:", err);
                    return res.status(500).json({
                        message: "Failed to create stock movement"
                    });
                }

                const movementId = result.insertId;

                // Only completed movements change stock
                if (movementStatus !== "done") {
                    return res.status(201).json({
                        id: movementId,
                        product_id,
                        supplier_id: supplier_id || null,
                        movement_type,
                        quantity,
                        from_warehouse: from_warehouse || null,
                        to_warehouse: to_warehouse || null,
                        status: movementStatus,
                        stockUpdated: false
                    });
                }

                // RECEIPT: increase stock
                if (movement_type === "receipt") {
                    const updateSql = `
                        UPDATE products
                        SET stock = stock + ?
                        WHERE id = ?
                    `;

                    return db.query(
                        updateSql,
                        [quantity, product_id],
                        (err) => {
                            if (err) {
                                console.error("Error updating stock:", err);
                                return res.status(500).json({
                                    message:
                                        "Movement created but stock update failed"
                                });
                            }

                            return res.status(201).json({
                                id: movementId,
                                product_id,
                                movement_type,
                                quantity,
                                status: movementStatus,
                                stockUpdated: true,
                                newStock: product.stock + quantity
                            });
                        }
                    );
                }

                // DELIVERY: decrease stock
                if (movement_type === "delivery") {
                    const updateSql = `
                        UPDATE products
                        SET stock = stock - ?
                        WHERE id = ?
                        AND stock >= ?
                    `;

                    return db.query(
                        updateSql,
                        [quantity, product_id, quantity],
                        (err, result) => {
                            if (err) {
                                console.error("Error updating stock:", err);
                                return res.status(500).json({
                                    message:
                                        "Movement created but stock update failed"
                                });
                            }

                            if (result.affectedRows === 0) {
                                return res.status(400).json({
                                    message: "Insufficient stock"
                                });
                            }

                            return res.status(201).json({
                                id: movementId,
                                product_id,
                                movement_type,
                                quantity,
                                status: movementStatus,
                                stockUpdated: true,
                                newStock: product.stock - quantity
                            });
                        }
                    );
                }

                // Adjustment
                if (movement_type === "adjustment") {
                    return res.status(201).json({
                        id: movementId,
                        product_id,
                        movement_type,
                        quantity,
                        status: movementStatus,
                        stockUpdated: false,
                        message:
                            "Adjustment recorded. Stock direction needs to be specified separately."
                    });
                }

                // Transfer
                return res.status(201).json({
                    id: movementId,
                    product_id,
                    movement_type,
                    quantity,
                    from_warehouse: from_warehouse || null,
                    to_warehouse: to_warehouse || null,
                    status: movementStatus,
                    stockUpdated: false,
                    message:
                        "Transfer recorded. Warehouse transfer logic will be added separately."
                });
            }
        );
    });
});

module.exports = router;