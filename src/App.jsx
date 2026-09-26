import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">StockSense</div>

        <nav>
          <a className="active">Dashboard</a>
          <a>Products</a>
          <a>Receipts</a>
          <a>Delivery Orders</a>
          <a>Internal Transfers</a>
          <a>Inventory Adjustments</a>
          <a>Move History</a>
        </nav>

        <div className="sidebar-bottom">
          <a>Settings</a>
          <a>My Profile</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Inventory Dashboard</h1>
            <p>Monitor your stock operations in one place.</p>
          </div>

          <button className="profile-button">Inventory Manager</button>
        </header>

        <section className="kpi-grid">
          <div className="kpi-card">
            <span>Total Products</span>
            <strong>1,248</strong>
            <small>Products currently tracked</small>
          </div>

          <div className="kpi-card warning">
            <span>Low / Out of Stock</span>
            <strong>24</strong>
            <small>Items need attention</small>
          </div>

          <div className="kpi-card">
            <span>Pending Receipts</span>
            <strong>18</strong>
            <small>Incoming stock operations</small>
          </div>

          <div className="kpi-card">
            <span>Pending Deliveries</span>
            <strong>12</strong>
            <small>Outgoing stock operations</small>
          </div>

          <div className="kpi-card">
            <span>Transfers Scheduled</span>
            <strong>7</strong>
            <small>Internal movements</small>
          </div>
        </section>
<section className="scanner-card">
  <div className="scanner-info">
    <span className="scanner-label">STOCKSENSE SCANNER</span>
    <h2>Ready to scan inventory</h2>
    <p>Track products, locations and stock movements.</p>
  </div>

  <div className="scanner-visual">
    <div className="scanner-box">
      <div className="box-top"></div>
      <div className="box-front">
        <span>SS</span>
      </div>
    </div>

    <div className="scan-line"></div>
  </div>
</section>
        <section className="content-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Recent Stock Activity</h2>
                <p>Latest inventory movements</p>
              </div>

              <button className="secondary-button">View History</button>
            </div>

            <div className="activity">
              <div>
                <strong>Steel Rods</strong>
                <span>Receipt • Main Warehouse</span>
              </div>
              <b className="positive">+50</b>
            </div>

            <div className="activity">
              <div>
                <strong>Office Chairs</strong>
                <span>Delivery • Main Warehouse</span>
              </div>
              <b className="negative">-10</b>
            </div>

            <div className="activity">
              <div>
                <strong>Production Materials</strong>
                <span>Internal Transfer</span>
              </div>
              <b>→</b>
            </div>
          </div>

          <div className="panel alert-panel">
            <h2>Stock Alerts</h2>
            <p>Products that need attention</p>

            <div className="alert">
              <strong>Steel Rods</strong>
              <span>Only 8 kg remaining</span>
            </div>

            <div className="alert">
              <strong>Office Chairs</strong>
              <span>Out of stock</span>
            </div>

            <div className="alert">
              <strong>Packaging Boxes</strong>
              <span>Below minimum level</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App