const express = require("express");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Product routes
const productsRoutes = require("./routes/products");

app.use("/api/products", productsRoutes);
const categoriesRoutes = require("./routes/categories");
app.use("/api/categories", categoriesRoutes);
const warehousesRoutes = require("./routes/warehouses");
app.use("/api/warehouses", warehousesRoutes);
const suppliersRoutes = require("./routes/suppliers");
app.use("/api/suppliers", suppliersRoutes);
const stockMovementsRoutes = require("./routes/stockMovements");
app.use("/api/stock-movements", stockMovementsRoutes);


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