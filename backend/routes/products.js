const express = require("express");

const router = express.Router();

// Temporary product data
// Database will be connected later.
let products = [];

// GET all products
router.get("/", (req, res) => {
    res.json(products);
});

// GET one product
router.get("/:id", (req, res) => {
    const product = products.find(
        (p) => p.id === Number(req.params.id)
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// CREATE a product
router.post("/", (req, res) => {
    const { name, sku, category, unit, initialStock } = req.body;

    if (!name || !sku) {
        return res.status(400).json({
            message: "Name and SKU are required"
        });
    }

    const product = {
        id: products.length + 1,
        name,
        sku,
        category: category || "",
        unit: unit || "",
        initialStock: initialStock || 0
    };

    products.push(product);

    res.status(201).json(product);
});

module.exports = router;