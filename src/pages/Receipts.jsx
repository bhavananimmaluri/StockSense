import { useMemo, useState } from 'react'

import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import StatusBadge from '../components/StatusBadge'

import { categories, warehouses } from '../data/mockData'

const blankProduct = {
  name: '',
  sku: '',
  category: 'Raw Materials',
  unit: 'pcs',
  stock: '',
  reorderLevel: '10',
  location: 'Main Warehouse',
  description: '',
}

function Products({
  products,
  onAddProduct,
  onUpdateProduct,
  onToast,
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] =
    useState('All Categories')
  const [status, setStatus] =
    useState('All Stock Status')

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const [form, setForm] =
    useState(blankProduct)

  const filteredProducts = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(query) ||
        product.sku
          .toLowerCase()
          .includes(query)

      const matchesCategory =
        category === 'All Categories' ||
        product.category === category

      let matchesStatus = true

      if (status === 'In Stock') {
        matchesStatus =
          product.stock > product.reorderLevel
      }

      if (status === 'Low Stock') {
        matchesStatus =
          product.stock > 0 &&
          product.stock <=
            product.reorderLevel
      }

      if (status === 'Out of Stock') {
        matchesStatus =
          product.stock === 0
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      )
    })
  }, [
    products,
    search,
    category,
    status,
  ])

  const openCreate = () => {
    setEditing(null)
    setForm(blankProduct)
    setOpen(true)
  }

  const openEdit = (product) => {
    setEditing(product)

    setForm({
      ...product,
      stock: String(product.stock),
      reorderLevel: String(
        product.reorderLevel
      ),
    })

    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setEditing(null)
    setForm(blankProduct)
  }

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const submit = (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      onToast(
        'Product name is required',
        'error'
      )
      return
    }

    if (!form.sku.trim()) {
      onToast(
        'SKU / Code is required',
        'error'
      )
      return
    }

    if (Number(form.stock) < 0) {
      onToast(
        'Stock cannot be negative',
        'error'
      )
      return
    }

    if (Number(form.reorderLevel) < 0) {
      onToast(
        'Reorder level cannot be negative',
        'error'
      )
      return
    }

    const productData = {
      ...form,
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      stock: Number(form.stock) || 0,
      reorderLevel:
        Number(form.reorderLevel) || 0,
    }

    if (editing) {
      onUpdateProduct(
        editing.id,
        productData
      )
    } else {
      onAddProduct(productData)
    }

    closeModal()
  }

  const getStatus = (product) => {
    if (product.stock === 0) {
      return {
        tone: 'danger',
        label: 'Out of Stock',
      }
    }

    if (
      product.stock <=
      product.reorderLevel
    ) {
      return {
        tone: 'warning',
        label: 'Low Stock',
      }
    }

    return {
      tone: 'success',
      label: 'In Stock',
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="INVENTORY"
        title="Products"
        description="Manage products, SKUs, stock levels and reorder thresholds."
        action={
          <button
            className="primary-button"
            onClick={openCreate}
          >
            + Add Product
          </button>
        }
      />

      <div className="filter-bar">

        <div className="search-box wide">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by product name or SKU..."
          />
        </div>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          <option>
            All Categories
          </option>

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option>
            All Stock Status
          </option>

          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>

      </div>

      <div className="table-card">

        <div className="table-card-header">

          <div>
            <h2>
              Product Inventory
            </h2>

            <p>
              {filteredProducts.length}{' '}
              products match the current
              filters.
            </p>
          </div>

          <span className="count-pill">
            {products.length} total
          </span>

        </div>

        <div className="responsive-table">

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Stock</th>
                <th>Location</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(
                (product) => {
                  const statusInfo =
                    getStatus(product)

                  return (
                    <tr key={product.id}>

                      <td>
                        <strong>
                          {product.name}
                        </strong>

                        <small>
                          {product.description ||
                            'No description'}
                        </small>
                      </td>

                      <td className="mono">
                        {product.sku}
                      </td>

                      <td>
                        {product.category}
                      </td>

                      <td>
                        {product.unit}
                      </td>

                      <td>
                        <strong>
                          {product.stock}
                        </strong>
                      </td>

                      <td>
                        {product.location}
                      </td>

                      <td>
                        <StatusBadge
                          tone={
                            statusInfo.tone
                          }
                        >
                          {statusInfo.label}
                        </StatusBadge>
                      </td>

                      <td>
                        <button
                          className="table-action"
                          onClick={() =>
                            openEdit(product)
                          }
                        >
                          Edit
                        </button>
                      </td>

                    </tr>
                  )
                }
              )}
            </tbody>
          </table>

          {filteredProducts.length ===
            0 && (
            <div className="empty-state">
              <strong>
                No products found
              </strong>

              <span>
                Try another search or
                filter.
              </span>
            </div>
          )}

        </div>
      </div>

      <Modal
        open={open}
        title={
          editing
            ? 'Edit Product'
            : 'Add Product'
        }
        description="Keep product identity and stock thresholds consistent."
        onClose={closeModal}
      >

        <form
          className="form-grid"
          onSubmit={submit}
        >

          <label>
            Product Name *
            <input
              value={form.name}
              onChange={(event) =>
                updateField(
                  'name',
                  event.target.value
                )
              }
              placeholder="e.g. Steel Rods"
            />
          </label>

          <label>
            SKU / Code *
            <input
              value={form.sku}
              onChange={(event) =>
                updateField(
                  'sku',
                  event.target.value.toUpperCase()
                )
              }
              placeholder="e.g. STL-001"
            />
          </label>

          <label>
            Category

            <select
              value={form.category}
              onChange={(event) =>
                updateField(
                  'category',
                  event.target.value
                )
              }
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Unit of Measure

            <select
              value={form.unit}
              onChange={(event) =>
                updateField(
                  'unit',
                  event.target.value
                )
              }
            >
              <option>pcs</option>
              <option>kg</option>
              <option>g</option>
              <option>m</option>
              <option>litre</option>
              <option>box</option>
            </select>
          </label>

          <label>
            Initial Stock

            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) =>
                updateField(
                  'stock',
                  event.target.value
                )
              }
              placeholder="0"
            />
          </label>

          <label>
            Reorder Level

            <input
              type="number"
              min="0"
              value={form.reorderLevel}
              onChange={(event) =>
                updateField(
                  'reorderLevel',
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Warehouse / Location

            <select
              value={form.location}
              onChange={(event) =>
                updateField(
                  'location',
                  event.target.value
                )
              }
            >
              {warehouses.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="full">
            Description

            <textarea
              rows="3"
              value={
                form.description || ''
              }
              onChange={(event) =>
                updateField(
                  'description',
                  event.target.value
                )
              }
              placeholder="Optional description"
            />
          </label>

          <div className="form-actions full">

            <button
              type="button"
              className="secondary-button"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              {editing
                ? 'Save Changes'
                : 'Create Product'}
            </button>

          </div>

        </form>

      </Modal>
    </>
  )
}

export default Products