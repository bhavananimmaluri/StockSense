export const categories = [
  'Raw Materials',
  'Finished Goods',
  'Packaging',
  'Office Supplies',
]

export const warehouses = [
  'Main Warehouse',
  'Production Floor',
  'Rack A',
  'Rack B',
  'Warehouse 2',
]

export const initialProducts = [
  {
    id: 1,
    name: 'Steel Rods',
    sku: 'STL-001',
    category: 'Raw Materials',
    unit: 'kg',
    stock: 8,
    reorderLevel: 15,
    location: 'Main Warehouse',
    description: 'Construction material',
  },

  {
    id: 2,
    name: 'Office Chairs',
    sku: 'CHR-024',
    category: 'Finished Goods',
    unit: 'pcs',
    stock: 0,
    reorderLevel: 10,
    location: 'Main Warehouse',
    description: 'Office furniture',
  },

  {
    id: 3,
    name: 'Packaging Boxes',
    sku: 'PKG-108',
    category: 'Packaging',
    unit: 'pcs',
    stock: 42,
    reorderLevel: 20,
    location: 'Main Warehouse',
    description: 'Shipping supplies',
  },

  {
    id: 4,
    name: 'Copper Wire',
    sku: 'COP-014',
    category: 'Raw Materials',
    unit: 'm',
    stock: 126,
    reorderLevel: 30,
    location: 'Main Warehouse',
    description: 'Electrical material',
  },

  {
    id: 5,
    name: 'Work Tables',
    sku: 'TBL-011',
    category: 'Finished Goods',
    unit: 'pcs',
    stock: 24,
    reorderLevel: 8,
    location: 'Production Floor',
    description: 'Industrial work tables',
  },
]

export const initialMovements = [
  {
    id: 101,
    date: 'Today, 09:42',
    type: 'Receipt',
    product: 'Steel Rods',
    sku: 'STL-001',
    quantity: '+50',
    from: 'Supplier',
    to: 'Main Warehouse',
    reference: 'REC-1042',
  },

  {
    id: 102,
    date: 'Today, 09:18',
    type: 'Delivery',
    product: 'Office Chairs',
    sku: 'CHR-024',
    quantity: '-10',
    from: 'Main Warehouse',
    to: 'Customer',
    reference: 'DEL-0821',
  },

  {
    id: 103,
    date: 'Today, 08:55',
    type: 'Internal Transfer',
    product: 'Packaging Boxes',
    sku: 'PKG-108',
    quantity: '12',
    from: 'Rack A',
    to: 'Rack B',
    reference: 'TRF-0317',
  },

  {
    id: 104,
    date: 'Yesterday, 16:24',
    type: 'Adjustment',
    product: 'Copper Wire',
    sku: 'COP-014',
    quantity: '-3',
    from: 'Main Warehouse',
    to: 'Main Warehouse',
    reference: 'DAMAGED-003',
  },
]