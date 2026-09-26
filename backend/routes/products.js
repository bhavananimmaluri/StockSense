const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET all products
router.get("/", (req, res) => {
    const sql = `
        SELECT
            id,
            name,
            sku,
            category_id,
            warehouse_id,
            unit,
            stock
        FROM products
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({
                message: "Failed to fetch products"
            });
        }

        res.json(results);
    });
});

// GET one product
router.get("/:id", (req, res) => {
    const sql = `
        SELECT
            id,
            name,
            sku,
            category_id,
            warehouse_id,
            unit,
            stock
        FROM products
        WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error("Error fetching product:", err);
            return res.status(500).json({
                message: "Failed to fetch product"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(results[0]);
    });
});

// CREATE a product
router.post("/", (req, res) => {
    const {
        name,
        sku,
        category_id,
        warehouse_id,
        unit,
        stock
    } = req.body;

    if (!name || !sku || !category_id || !warehouse_id) {
        return res.status(400).json({
            message: "Name, SKU, category_id and warehouse_id are required"
        });
    }

    const sql = `
        INSERT INTO products
        (name, sku, category_id, warehouse_id, unit, stock)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            sku,
            category_id,
            warehouse_id,
            unit || "",
            stock || 0
        ],
        (err, result) => {
            if (err) {
                console.error("Error creating product:", err);

                return res.status(500).json({
                    message: "Failed to create product"
                });
            }

            res.status(201).json({
                id: result.insertId,
                name,
                sku,
                category_id,
                warehouse_id,
                unit: unit || "",
                stock: stock || 0
            });
        }
    );
});

module.exports = router;