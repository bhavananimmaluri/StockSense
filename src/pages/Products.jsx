import { useState } from 'react'

import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'

function Dashboard({
  products,
  movements,
  dashboardStats,
  warehouse,
  setWarehouse,
  onNavigate,
}) {
  const [scanner, setScanner] = useState({
    x: 0,
    y: 0,
  })

  const lowStock = products.filter(
    (product) =>
      product.stock <= product.reorderLevel
  )

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect()

    const x =
      ((event.clientX - rect.left) /
        rect.width -
        0.5) *
      18

    const y =
      ((event.clientY - rect.top) /
        rect.height -
        0.5) *
      10

    setScanner({ x, y })
  }

  return (
    <>
      <PageHeader
        eyebrow="OVERVIEW"
        title="Inventory Dashboard"
        description="Monitor stock, operations and movement across your warehouse."
        action={
          <>
            <select
              className="warehouse-select"
              value={warehouse}
              onChange={(event) =>
                setWarehouse(event.target.value)
              }
            >
              <option>Main Warehouse</option>
              <option>Production Floor</option>
              <option>Rack A</option>
              <option>Rack B</option>
              <option>Warehouse 2</option>
            </select>

            <button className="profile-pill">
              Inventory Manager
            </button>
          </>
        }
      />

      <section className="kpi-grid">

        <div className="kpi-card">
          <span>Total Products</span>
          <strong>
            {dashboardStats.totalProducts}
          </strong>
          <small>
            Products currently tracked
          </small>
          <i className="kpi-accent blue" />
        </div>

        <div className="kpi-card">
          <span>Low / Out of Stock</span>
          <strong>
            {dashboardStats.lowOrOut}
          </strong>
          <small>
            {dashboardStats.outOfStock}{' '}
            currently out of stock
          </small>
          <i className="kpi-accent amber" />
        </div>

        <div className="kpi-card">
          <span>Pending Receipts</span>
          <strong>18</strong>
          <small>
            Incoming stock operations
          </small>
          <i className="kpi-accent green" />
        </div>

        <div className="kpi-card">
          <span>Pending Deliveries</span>
          <strong>12</strong>
          <small>
            Outgoing stock operations
          </small>
          <i className="kpi-accent red" />
        </div>

        <div className="kpi-card">
          <span>Transfers Scheduled</span>
          <strong>7</strong>
          <small>
            Internal movements
          </small>
          <i className="kpi-accent violet" />
        </div>

      </section>

      <section
        className="intelligence-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={() =>
          setScanner({
            x: 0,
            y: 0,
          })
        }
      >

        <div className="intelligence-copy">

          <span className="scanner-label">
            STOCK INTELLIGENCE
          </span>

          <h2>
            Inventory in motion.
          </h2>

          <p>
            A live workspace for receiving,
            delivering, transferring and
            reconciling stock.
          </p>

          <button
            className="secondary-button"
            onClick={() =>
              onNavigate('Move History')
            }
          >
            Open stock ledger →
          </button>

        </div>

        <div
          className="warehouse-visual"
          style={{
            transform: `
              translate(
                ${scanner.x}px,
                ${scanner.y}px
              )
            `,
          }}
        >
          <div className="scan-ring ring-one" />
          <div className="scan-ring ring-two" />

          <div className="warehouse-rack">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="scan-beam" />
          <div className="warehouse-floor" />
        </div>

      </section>

      <section className="content-grid">

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>
                Recent Stock Activity
              </h2>

              <p>
                Latest inventory movements
              </p>
            </div>

            <button
              className="text-button"
              onClick={() =>
                onNavigate('Move History')
              }
            >
              View history
            </button>

          </div>

          <div className="activity-list">

            {movements
              .slice(0, 5)
              .map((movement) => (
                <div
                  className="activity-row"
                  key={movement.id}
                >
                  <div className="activity-icon">
                    {movement.type ===
                    'Receipt'
                      ? '↓'
                      : movement.type ===
                        'Delivery'
                      ? '↑'
                      : movement.type ===
                        'Internal Transfer'
                      ? '⇄'
                      : '±'}
                  </div>

                  <div className="activity-main">
                    <strong>
                      {movement.product}
                    </strong>

                    <span>
                      {movement.type}
                      {' · '}
                      {movement.from}
                      {' → '}
                      {movement.to}
                    </span>
                  </div>

                  <b
                    className={
                      String(
                        movement.quantity
                      ).startsWith('-')
                        ? 'negative'
                        : 'positive'
                    }
                  >
                    {movement.quantity}
                  </b>
                </div>
              ))}

          </div>
        </div>

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>
                Stock Alerts
              </h2>

              <p>
                Products that need attention
              </p>
            </div>

            <StatusBadge tone="warning">
              {lowStock.length} items
            </StatusBadge>

          </div>

          <div className="alert-list">

            {lowStock.length === 0 && (
              <div className="empty-state compact">
                <strong>
                  All stock levels are healthy
                </strong>
              </div>
            )}

            {lowStock
              .slice(0, 5)
              .map((product) => (
                <div
                  className="alert-row"
                  key={product.id}
                >
                  <div>
                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.stock === 0
                        ? 'Out of stock'
                        : `${product.stock} ${product.unit} remaining`}
                    </span>
                  </div>

                  <StatusBadge
                    tone={
                      product.stock === 0
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {product.stock === 0
                      ? 'Critical'
                      : 'Low'}
                  </StatusBadge>
                </div>
              ))}

          </div>
        </div>

      </section>
    </>
  )
}

export default Dashboard