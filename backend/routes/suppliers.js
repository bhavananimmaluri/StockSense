const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET all suppliers
router.get("/", (req, res) => {
    const sql = `
        SELECT id, name, email, phone
        FROM suppliers
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching suppliers:", err);
            return res.status(500).json({
                message: "Failed to fetch suppliers"
            });
        }

        res.json(results);
    });
});

// GET one supplier
router.get("/:id", (req, res) => {
    const sql = `
        SELECT id, name, email, phone
        FROM suppliers
        WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error("Error fetching supplier:", err);
            return res.status(500).json({
                message: "Failed to fetch supplier"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.json(results[0]);
    });
});

// CREATE supplier
router.post("/", (req, res) => {
    const { name, email, phone } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Supplier name is required"
        });
    }

    const sql = `
        INSERT INTO suppliers (name, email, phone)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [name, email || null, phone || null],
        (err, result) => {
            if (err) {
                console.error("Error creating supplier:", err);
                return res.status(500).json({
                    message: "Failed to create supplier"
                });
            }

            res.status(201).json({
                id: result.insertId,
                name,
                email: email || null,
                phone: phone || null
            });
        }
    );
});

module.exports = router;