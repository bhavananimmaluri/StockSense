import { useState } from 'react'

import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { warehouses } from '../data/mockData'

function Settings({
  warehouse,
  setWarehouse,
  onToast,
}) {
  const [activeSection, setActiveSection] =
    useState('Warehouse')

  const [warehouseName, setWarehouseName] =
    useState(warehouse)

  const [notifications, setNotifications] =
    useState({
      lowStock: true,
      receipts: true,
      deliveries: true,
      transfers: false,
    })

  const saveWarehouse = (event) => {
    event.preventDefault()

    if (!warehouseName.trim()) {
      onToast(
        'Warehouse name is required',
        'error'
      )

      return
    }

    setWarehouse(warehouseName)

    onToast(
      'Warehouse settings saved successfully'
    )
  }

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  return (
    <>
      <PageHeader
        eyebrow="CONFIGURATION"
        title="Settings"
        description="Configure warehouse locations and inventory notifications."
      />

      <div className="settings-layout">

        <aside className="settings-menu">

          <button
            className={
              activeSection === 'Warehouse'
                ? 'settings-menu-item active'
                : 'settings-menu-item'
            }
            onClick={() =>
              setActiveSection('Warehouse')
            }
          >
            <span>▣</span>
            Warehouse
          </button>

          <button
            className={
              activeSection ===
              'Notifications'
                ? 'settings-menu-item active'
                : 'settings-menu-item'
            }
            onClick={() =>
              setActiveSection(
                'Notifications'
              )
            }
          >
            <span>◉</span>
            Notifications
          </button>

        </aside>

        <section className="settings-content">

          {activeSection ===
            'Warehouse' && (
            <>
              <div className="settings-card">

                <div className="settings-card-header">

                  <div>
                    <span className="card-kicker">
                      PRIMARY LOCATION
                    </span>

                    <h2>
                      Warehouse Configuration
                    </h2>

                    <p>
                      Select the location used
                      as the current inventory
                      workspace.
                    </p>
                  </div>

                  <StatusBadge tone="success">
                    Active
                  </StatusBadge>

                </div>

                <form
                  className="settings-form"
                  onSubmit={saveWarehouse}
                >

                  <label>
                    Current Warehouse

                    <input
                      value={warehouseName}
                      onChange={(event) =>
                        setWarehouseName(
                          event.target.value
                        )
                      }
                      placeholder="Warehouse name"
                    />
                  </label>

                  <div className="settings-location-grid">

                    {warehouses.map(
                      (location) => (
                        <button
                          type="button"
                          key={location}
                          className={
                            warehouseName ===
                            location
                              ? 'location-card active'
                              : 'location-card'
                          }
                          onClick={() =>
                            setWarehouseName(
                              location
                            )
                          }
                        >
                          <span>
                            {location ===
                            warehouse
                              ? '●'
                              : '○'}
                          </span>

                          <strong>
                            {location}
                          </strong>

                          <small>
                            Inventory location
                          </small>
                        </button>
                      )
                    )}

                  </div>

                  <div className="settings-actions">

                    <button className="primary-button">
                      Save Warehouse
                    </button>

                  </div>

                </form>

              </div>

              <div className="settings-card">

                <div className="settings-card-header">

                  <div>
                    <span className="card-kicker">
                      OPERATIONS
                    </span>

                    <h2>
                      Inventory Locations
                    </h2>

                    <p>
                      Locations currently
                      configured for stock
                      movements.
                    </p>
                  </div>

                </div>

                <div className="location-list">

                  {warehouses.map(
                    (location, index) => (
                      <div
                        className="location-list-row"
                        key={location}
                      >
                        <div className="location-number">
                          {String(index + 1).padStart(
                            2,
                            '0'
                          )}
                        </div>

                        <div>
                          <strong>
                            {location}
                          </strong>

                          <span>
                            Available for
                            inventory movement
                          </span>
                        </div>

                        <StatusBadge
                          tone={
                            location ===
                            warehouse
                              ? 'success'
                              : 'neutral'
                          }
                        >
                          {location ===
                          warehouse
                            ? 'Current'
                            : 'Available'}
                        </StatusBadge>
                      </div>
                    )
                  )}

                </div>

              </div>
            </>
          )}

          {activeSection ===
            'Notifications' && (
            <div className="settings-card">

              <div className="settings-card-header">

                <div>
                  <span className="card-kicker">
                    ALERTS
                  </span>

                  <h2>
                    Notification Preferences
                  </h2>

                  <p>
                    Choose which inventory
                    events should surface
                    alerts.
                  </p>
                </div>

              </div>

              <div className="notification-list">

                <NotificationRow
                  title="Low-stock alerts"
                  description="Notify when products reach their reorder threshold."
                  enabled={
                    notifications.lowStock
                  }
                  onToggle={() =>
                    toggleNotification(
                      'lowStock'
                    )
                  }
                />

                <NotificationRow
                  title="Receipt updates"
                  description="Show notifications when incoming stock is validated."
                  enabled={
                    notifications.receipts
                  }
                  onToggle={() =>
                    toggleNotification(
                      'receipts'
                    )
                  }
                />

                <NotificationRow
                  title="Delivery updates"
                  description="Show notifications when outgoing stock is validated."
                  enabled={
                    notifications.deliveries
                  }
                  onToggle={() =>
                    toggleNotification(
                      'deliveries'
                    )
                  }
                />

                <NotificationRow
                  title="Transfer updates"
                  description="Show notifications for internal inventory movements."
                  enabled={
                    notifications.transfers
                  }
                  onToggle={() =>
                    toggleNotification(
                      'transfers'
                    )
                  }
                />

              </div>

              <div className="settings-actions">

                <button
                  className="primary-button"
                  onClick={() =>
                    onToast(
                      'Notification preferences saved'
                    )
                  }
                >
                  Save Preferences
                </button>

              </div>

            </div>
          )}

        </section>

      </div>
    </>
  )
}

function NotificationRow({
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="notification-row">

      <div>
        <strong>{title}</strong>

        <span>
          {description}
        </span>
      </div>

      <button
        type="button"
        className={
          enabled
            ? 'toggle active'
            : 'toggle'
        }
        onClick={onToggle}
        aria-label={`Toggle ${title}`}
      >
        <span />
      </button>

    </div>
  )
}

export default Settings