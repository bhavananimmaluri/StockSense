import { useState } from 'react'

import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { warehouses } from '../data/mockData'

function Adjustments({
  products,
  warehouse,
  onAdjustment,
  onToast,
}) {
  const [form, setForm] = useState({
    productId: products[0]?.id || '',
    countedQuantity: '',
    location: warehouse,
    reason: '',
  })

  const selectedProduct = products.find(
    (product) =>
      product.id === Number(form.productId)
  )

  const counted =
    form.countedQuantity === ''
      ? null
      : Number(form.countedQuantity)

  const difference =
    selectedProduct && counted !== null
      ? counted - selectedProduct.stock
      : null

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const submit = (event) => {
    event.preventDefault()

    if (
      form.countedQuantity === '' ||
      Number(form.countedQuantity) < 0
    ) {
      onToast(
        'Enter a valid physical count.',
        'error'
      )

      return
    }

    const success = onAdjustment(form)

    if (success) {
      setForm((current) => ({
        ...current,
        countedQuantity: '',
        reason: '',
      }))
    } else {
      onToast(
        'Unable to create the stock adjustment.',
        'error'
      )
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="OPERATIONS / CONTROL"
        title="Inventory Adjustments"
        description="Reconcile recorded stock with the physical count."
      />

      <div className="operation-layout">

        <section className="operation-card">

          <div className="operation-heading">

            <div className="operation-icon adjustment">
              ±
            </div>

            <div>
              <h2>
                Stock Reconciliation
              </h2>

              <p>
                Enter the physical quantity
                and let StockSense calculate
                the difference.
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
              Location *

              <select
                value={form.location}
                onChange={(event) =>
                  updateField(
                    'location',
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
              Physical Count *

              <input
                type="number"
                min="0"
                value={form.countedQuantity}
                onChange={(event) =>
                  updateField(
                    'countedQuantity',
                    event.target.value
                  )
                }
                placeholder="Enter counted quantity"
              />
            </label>

            <label className="full">
              Reason

              <input
                value={form.reason}
                onChange={(event) =>
                  updateField(
                    'reason',
                    event.target.value
                  )
                }
                placeholder="e.g. Damaged stock, cycle count, missing units..."
              />
            </label>

            <div className="reconciliation-card full">

              <div>
                <span>
                  Recorded stock
                </span>

                <strong>
                  {selectedProduct?.stock ??
                    0}{' '}
                  {selectedProduct?.unit ??
                    ''}
                </strong>
              </div>

              <div className="reconciliation-symbol">
                →
              </div>

              <div>
                <span>
                  Physical count
                </span>

                <strong>
                  {counted === null
                    ? '—'
                    : `${counted} ${
                        selectedProduct?.unit ||
                        ''
                      }`}
                </strong>
              </div>

              <div className="reconciliation-difference">

                <span>
                  Difference
                </span>

                <strong
                  className={
                    difference === null
                      ? ''
                      : difference < 0
                      ? 'negative'
                      : difference > 0
                      ? 'positive'
                      : ''
                  }
                >
                  {difference === null
                    ? '—'
                    : difference > 0
                    ? `+${difference}`
                    : difference}
                </strong>

              </div>

            </div>

            <div className="form-actions full">

              <button className="primary-button">
                Apply Adjustment
              </button>

            </div>

          </form>

        </section>

        <section className="side-info">

          <div className="info-card">

            <span className="card-kicker">
              CONTROL
            </span>

            <h3>
              Physical vs recorded
            </h3>

            <p>
              Adjustments are intended to
              correct differences discovered
              during physical stock counts.
            </p>

            <StatusBadge tone="warning">
              Audit movement created
            </StatusBadge>

          </div>

          <div className="info-card accent">

            <span className="card-kicker">
              EXAMPLE
            </span>

            <strong>
              100 kg → 97 kg
            </strong>

            <p>
              A physical count of 97 kg
              against 100 kg recorded stock
              creates a -3 kg adjustment.
            </p>

          </div>

        </section>

      </div>
    </>
  )
}

export default Adjustments