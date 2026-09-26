import { useState } from "react";
import "./App.css";

const navItems = [
  "Dashboard",
  "Products",
  "Receipts",
  "Delivery Orders",
  "Internal Transfers",
  "Inventory Adjustments",
  "Move History",
];

const kpis = [
  {
    label: "Total Products",
    value: "1,248",
    description: "Products currently tracked",
  },
  {
    label: "Low / Out of Stock",
    value: "24",
    description: "Items need attention",
    warning: true,
  },
  {
    label: "Pending Receipts",
    value: "18",
    description: "Incoming stock operations",
  },
  {
    label: "Pending Deliveries",
    value: "12",
    description: "Outgoing stock operations",
  },
  {
    label: "Transfers Scheduled",
    value: "7",
    description: "Internal movements",
  },
];

const activities = [
  {
    product: "Steel Rods",
    type: "Receipt",
    location: "Main Warehouse",
    amount: "+50",
    positive: true,
  },
  {
    product: "Office Chairs",
    type: "Delivery",
    location: "Main Warehouse",
    amount: "-10",
    positive: false,
  },
  {
    product: "Production Materials",
    type: "Internal Transfer",
    location: "",
    amount: "→",
  },
];

const alerts = [
  {
    product: "Steel Rods",
    message: "Only 8 kg remaining",
  },
  {
    product: "Office Chairs",
    message: "Out of stock",
  },
  {
    product: "Packaging Boxes",
    message: "Below minimum level",
  },
];

function Dashboard() {
  return (
    <>
      <header className="topbar">
        <div>
          <h1>Inventory Dashboard</h1>
          <p>Monitor your stock operations in one place.</p>
        </div>

        <button className="profile-button">
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#16834b",
              marginRight: "9px",
            }}
          />
          Inventory Manager
        </button>
      </header>

      <section className="kpi-grid">
        {kpis.map((item) => (
          <article
            className={`kpi-card ${item.warning ? "warning" : ""}`}
            key={item.label}
          >
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.description}</small>
          </article>
        ))}
      </section>

      <section className="scanner-card">
        <div className="scanner-info">
          <span className="scanner-label">
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#f5c85b",
                marginRight: "8px",
              }}
            />
            STOCKSENSE SCANNER
          </span>

          <h2>Ready to scan inventory</h2>

          <p>Track products, locations and stock movements.</p>
        </div>

        <div className="scanner-visual">
          <div className="scanner-box">
            <div className="box-top" />
            <div className="box-front">
              <span>SS</span>
            </div>
          </div>

          <div className="scan-line" />
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

          <div>
            {activities.map((activity) => (
              <div className="activity" key={activity.product}>
                <div>
                  <strong>{activity.product}</strong>

                  <span>
                    {activity.type}
                    {activity.location
                      ? ` • ${activity.location}`
                      : ""}
                  </span>
                </div>

                <strong
                  className={
                    activity.positive
                      ? "positive"
                      : activity.amount === "-10"
                      ? "negative"
                      : ""
                  }
                >
                  {activity.amount}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel alert-panel">
          <div className="panel-header">
            <div>
              <h2>Stock Alerts</h2>
              <p>Products that need attention</p>
            </div>
          </div>

          <div>
            {alerts.map((alert) => (
              <div className="alert" key={alert.product}>
                <strong>{alert.product}</strong>
                <span>{alert.message}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="page-placeholder">
      <div className="page-placeholder-icon">SS</div>
      <h1>{title}</h1>
      <p>
        Manage your {title.toLowerCase()} from this workspace.
      </p>

      <div className="placeholder-card">
        <div>
          <strong>Coming next</strong>
          <span>
            This section is ready for the backend and database
            integration.
          </span>
        </div>

        <button className="secondary-button">
          Add New
        </button>
      </div>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const handleNavigation = (item) => {
    setActivePage(item);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">StockSense</div>

        <nav>
          {navItems.map((item) => (
            <a
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              key={item}
              className={activePage === item ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                handleNavigation(item);
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <a
            href="#settings"
            className={activePage === "Settings" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              handleNavigation("Settings");
            }}
          >
            Settings
          </a>

          <a
            href="#my-profile"
            className={activePage === "My Profile" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              handleNavigation("My Profile");
            }}
          >
            My Profile
          </a>
        </div>
      </aside>

      <main className="main-content">
        {activePage === "Dashboard" ? (
          <Dashboard />
        ) : (
          <PlaceholderPage title={activePage} />
        )}
      </main>
    </div>
  );
}

export default App;