function Products() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">INVENTORY</span>
          <h1>Products</h1>
          <p>Manage products, SKUs and stock information.</p>
        </div>

        <button className="primary-button">
          + Add Product
        </button>
      </div>

      <div className="product-toolbar">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search by product name or SKU..."
          />
        </div>

        <select>
          <option>All Categories</option>
          <option>Raw Materials</option>
          <option>Finished Goods</option>
          <option>Packaging</option>
        </select>

        <select>
          <option>All Stock Status</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      <div className="product-table-card">
        <div className="table-header">
          <div>
            <h2>Product Inventory</h2>
            <p>All products currently tracked in StockSense.</p>
          </div>

          <span className="product-count">1,248 Products</span>
        </div>

        <div className="product-table">
          <div className="table-row table-heading">
            <span>Product</span>
            <span>SKU</span>
            <span>Category</span>
            <span>Unit</span>
            <span>Stock</span>
            <span>Status</span>
          </div>

          <div className="table-row">
            <div>
              <strong>Steel Rods</strong>
              <small>Construction material</small>
            </div>

            <span>STL-001</span>
            <span>Raw Materials</span>
            <span>kg</span>
            <strong>8</strong>
            <span className="status low">Low Stock</span>
          </div>

          <div className="table-row">
            <div>
              <strong>Office Chairs</strong>
              <small>Office furniture</small>
            </div>

            <span>CHR-024</span>
            <span>Finished Goods</span>
            <span>pcs</span>
            <strong>0</strong>
            <span className="status out">Out of Stock</span>
          </div>

          <div className="table-row">
            <div>
              <strong>Packaging Boxes</strong>
              <small>Shipping supplies</small>
            </div>

            <span>PKG-108</span>
            <span>Packaging</span>
            <span>pcs</span>
            <strong>42</strong>
            <span className="status healthy">In Stock</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products