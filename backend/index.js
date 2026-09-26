const express = require("express");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Product routes
const productsRoutes = require("./routes/products");

app.use("/api/products", productsRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`StockSense backend running on http://localhost:${PORT}`);
});