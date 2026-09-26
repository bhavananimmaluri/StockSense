CREATE DATABASE stocksense;
USE stocksense;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('manager','staff') NOT NULL
);

CREATE TABLE warehouses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    category_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    unit VARCHAR(20),
    stock INT DEFAULT 0,

    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE stock_movements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    supplier_id INT NULL,

    movement_type ENUM(
        'receipt',
        'delivery',
        'transfer',
        'adjustment'
    ) NOT NULL,

    quantity INT NOT NULL CHECK (quantity > 0)

    from_warehouse INT NULL,
    to_warehouse INT NULL,

    status ENUM(
        'draft',
        'waiting',
        'ready',
        'done',
        'cancelled'
    ) DEFAULT 'draft',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (from_warehouse) REFERENCES warehouses(id),
    FOREIGN KEY (to_warehouse) REFERENCES warehouses(id)
);