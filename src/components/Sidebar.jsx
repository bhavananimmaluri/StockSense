const items = [
  ['Dashboard', '⌂'],
  ['Products', '▦'],
  ['Receipts', '↓'],
  ['Delivery Orders', '↑'],
  ['Internal Transfers', '⇄'],
  ['Inventory Adjustments', '±'],
  ['Move History', '◷'],
]

function Sidebar({
  activePage,
  onNavigate,
}) {
  return (
    <aside className="sidebar">

      <button
        className="brand"
        onClick={() => onNavigate('Dashboard')}
      >
        <span className="brand-mark">
          SS
        </span>

        <span className="brand-copy">
          <strong>StockSense</strong>
          <small>Inventory control</small>
        </span>
      </button>

      <div className="nav-label">
        WORKSPACE
      </div>

      <nav className="sidebar-nav">
        {items.map(([name, icon]) => (
          <button
            key={name}
            className={`nav-item ${
              activePage === name
                ? 'active'
                : ''
            }`}
            onClick={() => onNavigate(name)}
          >
            <span className="nav-icon">
              {icon}
            </span>

            <span>{name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="nav-label">
        ACCOUNT
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${
            activePage === 'Settings'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            onNavigate('Settings')
          }
        >
          <span className="nav-icon">
            ⚙
          </span>

          <span>Settings</span>
        </button>

        <button
          className={`nav-item ${
            activePage === 'My Profile'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            onNavigate('My Profile')
          }
        >
          <span className="nav-icon">
            ○
          </span>

          <span>My Profile</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" />
        System ready
      </div>
    </aside>
  )
}

export default Sidebar