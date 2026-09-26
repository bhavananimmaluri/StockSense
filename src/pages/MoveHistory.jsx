import { useMemo, useState } from 'react'

import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'

function MoveHistory({
  movements,
}) {
  const [search, setSearch] = useState('')
  const [type, setType] =
    useState('All Movement Types')

  const filteredMovements = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase()

    return movements.filter(
      (movement) => {
        const matchesSearch =
          !query ||
          movement.product
            .toLowerCase()
            .includes(query) ||
          movement.sku
            .toLowerCase()
            .includes(query) ||
          movement.reference
            .toLowerCase()
            .includes(query) ||
          movement.from
            .toLowerCase()
            .includes(query) ||
          movement.to
            .toLowerCase()
            .includes(query)

        const matchesType =
          type === 'All Movement Types' ||
          movement.type === type

        return (
          matchesSearch &&
          matchesType
        )
      }
    )
  }, [movements, search, type])

  const getTone = (movementType) => {
    if (movementType === 'Receipt') {
      return 'success'
    }

    if (movementType === 'Delivery') {
      return 'danger'
    }

    if (
      movementType === 'Internal Transfer'
    ) {
      return 'info'
    }

    return 'warning'
  }

  const getIcon = (movementType) => {
    if (movementType === 'Receipt') {
      return '↓'
    }

    if (movementType === 'Delivery') {
      return '↑'
    }

    if (
      movementType === 'Internal Transfer'
    ) {
      return '⇄'
    }

    return '±'
  }

  return (
    <>
      <PageHeader
        eyebrow="AUDIT / LEDGER"
        title="Move History"
        description="Review every recorded stock movement across the inventory."
      />

      <div className="filter-bar">

        <div className="search-box wide">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search product, SKU, reference or location..."
          />
        </div>

        <select
          value={type}
          onChange={(event) =>
            setType(event.target.value)
          }
        >
          <option>
            All Movement Types
          </option>

          <option>Receipt</option>
          <option>Delivery</option>
          <option>Internal Transfer</option>
          <option>Adjustment</option>
        </select>

      </div>

      <div className="table-card">

        <div className="table-card-header">

          <div>
            <h2>
              Stock Ledger
            </h2>

            <p>
              {filteredMovements.length}{' '}
              movements shown.
            </p>
          </div>

          <span className="count-pill">
            {movements.length} records
          </span>

        </div>

        <div className="responsive-table">

          <table>

            <thead>
              <tr>
                <th>Movement</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>From</th>
                <th>To</th>
                <th>Reference</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {filteredMovements.map(
                (movement) => (
                  <tr key={movement.id}>

                    <td>
                      <div className="movement-cell">

                        <div
                          className={`movement-icon ${getTone(
                            movement.type
                          )}`}
                        >
                          {getIcon(
                            movement.type
                          )}
                        </div>

                        <div>
                          <strong>
                            {movement.type}
                          </strong>

                          <small>
                            {movement.sku}
                          </small>
                        </div>

                      </div>
                    </td>

                    <td>
                      <strong>
                        {movement.product}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={
                          String(
                            movement.quantity
                          ).startsWith('-')
                            ? 'negative'
                            : 'positive'
                        }
                      >
                        {movement.quantity}
                      </span>
                    </td>

                    <td>
                      {movement.from}
                    </td>

                    <td>
                      {movement.to}
                    </td>

                    <td className="mono">
                      {movement.reference}
                    </td>

                    <td>
                      <span className="muted-text">
                        {movement.date}
                      </span>
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {filteredMovements.length ===
            0 && (
            <div className="empty-state">
              <strong>
                No movements found
              </strong>

              <span>
                Try changing your search
                or movement type.
              </span>
            </div>
          )}

        </div>

      </div>
    </>
  )
}

export default MoveHistory