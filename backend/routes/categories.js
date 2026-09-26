const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET all categories
router.get("/", (req, res) => {
    const sql = "SELECT id, name FROM categories";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching categories:", err);
            return res.status(500).json({
                message: "Failed to fetch categories"
            });
        }

        res.json(results);
    });
});

// GET one category
router.get("/:id", (req, res) => {
    const sql = "SELECT id, name FROM categories WHERE id = ?";

    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error("Error fetching category:", err);
            return res.status(500).json({
                message: "Failed to fetch category"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json(results[0]);
    });
});

// CREATE category
router.post("/", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Category name is required"
        });
    }

    const sql = "INSERT INTO categories (name) VALUES (?)";

    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error("Error creating category:", err);
            return res.status(500).json({
                message: "Failed to create category"
            });
        }

        res.status(201).json({
            id: result.insertId,
            name
        });
    });
});

module.exports = router;