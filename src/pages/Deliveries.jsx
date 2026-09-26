import { useState } from 'react'

import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'

function Receipts({
  products,
  onReceipt,
  onToast,
}) {
  const [form, setForm] = useState({
    productId: products[0]?.id || '',
    quantity: '',
    supplier: '',
    reference: '',
  })

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const submit = (event) => {
    event.preventDefault()

    const success = onReceipt(form)

    if (success) {
      setForm((current) => ({
        ...current,
        quantity: '',
        reference: '',
      }))
    } else {
      onToast(
        'Choose a product and enter a quantity greater than zero.',
        'error'
      )
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="OPERATIONS / INBOUND"
        title="Receipts"
        description="Receive supplier stock and increase available inventory."
      />

      <div className="operation-layout">

        <section className="operation-card">

          <div className="operation-heading">

            <div className="operation-icon inbound">
              ↓
            </div>

            <div>
              <h2>New Receipt</h2>

              <p>
                Validate a receipt to
                increase stock automatically.
              </p>
            </div>

          </div>

          <form
            className="form-grid"
            onSubmit={submit}
          >

            <label className="full">
              Supplier

              <input
                value={form.supplier}
                onChange={(event) =>
                  updateField(
                    'supplier',
                    event.target.value
                  )
                }
                placeholder="e.g. Apex Steel Supplies"
              />
            </label>

            <label>
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
              Quantity *

              <input
                type="number"
                min="1"
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

            <label className="full">
              Reference

              <input
                value={form.reference}
                onChange={(event) =>
                  updateField(
                    'reference',
                    event.target.value
                  )
                }
                placeholder="Supplier invoice / receipt reference"
              />
            </label>

            <div className="stock-flow full">
              <span>Supplier</span>
              <b>→</b>
              <span>Warehouse</span>
              <b>→</b>
              <strong>
                Stock increases
              </strong>
            </div>

            <div className="form-actions full">
              <button className="primary-button">
                Validate Receipt
              </button>
            </div>

          </form>

        </section>

        <section className="side-info">

          <div className="info-card">

            <span className="card-kicker">
              WORKFLOW
            </span>

            <h3>
              Receipt validation
            </h3>

            <p>
              Once validated, the received
              quantity becomes available
              stock and a ledger movement
              is created.
            </p>

            <StatusBadge tone="success">
              Stock + quantity
            </StatusBadge>

          </div>

          <div className="info-card accent">

            <span className="card-kicker">
              EXAMPLE
            </span>

            <strong>50 kg</strong>

            <p>
              Steel Rods received →
              Main Warehouse stock
              increases by 50 kg.
            </p>

          </div>

        </section>

      </div>
    </>
  )
}

export default Receipts