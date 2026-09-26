const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "StockSense backend is healthy"
    });
});

module.exports = router;