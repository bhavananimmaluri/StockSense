
import { useState } from 'react'

import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { warehouses } from '../data/mockData'

function Transfers({
  products,
  onTransfer,
  onToast,
}) {
  const [form, setForm] = useState({
    productId: products[0]?.id || '',
    quantity: '',
    from: 'Main Warehouse',
    to: 'Production Floor',
    reference: '',
  })

  const selectedProduct = products.find(
    (product) =>
      product.id === Number(form.productId)
  )

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const submit = (event) => {
    event.preventDefault()

    const success = onTransfer(form)

    if (success) {
      setForm((current) => ({
        ...current,
        quantity: '',
        reference: '',
      }))
    } else {
      onToast(
        'Check the product, quantity and source/destination locations.',
        'error'
      )
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="OPERATIONS / INTERNAL"
        title="Internal Transfers"
        description="Move inventory between warehouses, racks and production locations."
      />

      <div className="operation-layout">

        <section className="operation-card">

          <div className="operation-heading">

            <div className="operation-icon transfer">
              ⇄
            </div>

            <div>
              <h2>
                New Internal Transfer
              </h2>

              <p>
                Record a stock movement
                between internal locations.
              </p>
            </div>

          </div>

          <form
            className="form-grid"
            onSubmit={submit}
          >

            <label className="full">
              Product *

              <select
                value={form.productId}
                onChange={(event) =>
                  updateField(
                    'productId',
                    event.target.value
                  )
                }
              >
                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name} ·{' '}
                    {product.sku}
                  </option>
                ))}
              </select>
            </label>

            <label>
              From *

              <select
                value={form.from}
                onChange={(event) =>
                  updateField(
                    'from',
                    event.target.value
                  )
                }
              >
                {warehouses.map((location) => (
                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>
                ))}
              </select>
            </label>

            <label>
              To *

              <select
                value={form.to}
                onChange={(event) =>
                  updateField(
                    'to',
                    event.target.value
                  )
                }
              >
                {warehouses.map((location) => (
                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Quantity *

              <input
                type="number"
                min="1"
                max={
                  selectedProduct?.stock || 0
                }
                value={form.quantity}
                onChange={(event) =>
                  updateField(
                    'quantity',
                    event.target.value
                  )
                }
                placeholder="0"
              />
            </label>

            <label>
              Reference

              <input
                value={form.reference}
                onChange={(event) =>
                  updateField(
                    'reference',
                    event.target.value
                  )
                }
                placeholder="TRF-0001"
              />
            </label>

            <div className="availability full">

              <span>
                Available at source
              </span>

              <strong>
                {selectedProduct?.stock ??
                  0}{' '}
                {selectedProduct?.unit ??
                  ''}
              </strong>

              <StatusBadge
                tone={
                  selectedProduct?.stock > 0
                    ? 'success'
                    : 'danger'
                }
              >
                {selectedProduct?.stock > 0
                  ? 'Available'
                  : 'No stock'}
              </StatusBadge>

            </div>

            <div className="transfer-preview full">

              <div className="location-node">
                <span>FROM</span>
                <strong>{form.from}</strong>
              </div>

              <div className="transfer-arrow">
                <span>→</span>
                <small>
                  {form.quantity || 0}{' '}
                  {selectedProduct?.unit ||
                    'units'}
                </small>
              </div>

              <div className="location-node">
                <span>TO</span>
                <strong>{form.to}</strong>
              </div>

            </div>

            <div className="form-actions full">

              <button className="primary-button">
                Validate Transfer
              </button>

            </div>

          </form>

        </section>

        <section className="side-info">

          <div className="info-card">

            <span className="card-kicker">
              LEDGER
            </span>

            <h3>
              Every move is logged
            </h3>

            <p>
              Internal transfers create a
              movement record showing the
              source, destination, product
              and quantity.
            </p>

            <StatusBadge tone="success">
              Movement tracked
            </StatusBadge>

          </div>

          <div className="info-card accent">

            <span className="card-kicker">
              EXAMPLE
            </span>

            <strong>
              Main Warehouse → Production
            </strong>

            <p>
              Move inventory from the main
              store to a production rack
              without creating a new product.
            </p>

          </div>

        </section>

      </div>
    </>
  )
}

export default Transfers