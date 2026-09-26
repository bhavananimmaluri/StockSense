const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET all warehouses
router.get("/", (req, res) => {
    const sql = `
        SELECT id, name, location
        FROM warehouses
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching warehouses:", err);
            return res.status(500).json({
                message: "Failed to fetch warehouses"
            });
        }

        res.json(results);
    });
});

// GET one warehouse
router.get("/:id", (req, res) => {
    const sql = `
        SELECT id, name, location
        FROM warehouses
        WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error("Error fetching warehouse:", err);
            return res.status(500).json({
                message: "Failed to fetch warehouse"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Warehouse not found"
            });
        }

        res.json(results[0]);
    });
});

// CREATE warehouse
router.post("/", (req, res) => {
    const { name, location } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Warehouse name is required"
        });
    }

    const sql = `
        INSERT INTO warehouses (name, location)
        VALUES (?, ?)
    `;

    db.query(sql, [name, location || null], (err, result) => {
        if (err) {
            console.error("Error creating warehouse:", err);
            return res.status(500).json({
                message: "Failed to create warehouse"
            });
        }

        res.status(201).json({
            id: result.insertId,
            name,
            location: location || null
        });
    });
});

module.exports = router;