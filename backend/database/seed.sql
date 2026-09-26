USE stocksense;

INSERT INTO warehouses(name, location)
VALUES
('Main Warehouse','Hyderabad'),
('Warehouse 2','Hyderabad');

INSERT INTO categories(name)
VALUES
('Raw Material'),
('Furniture'),
('Electronics');

INSERT INTO suppliers(name,email,phone)
VALUES
('Steel Corp','steel@example.com','9876543210'),
('Wood House','wood@example.com','9876500000');

INSERT INTO users(name,email,password,role)
VALUES
('Admin','admin@stocksense.com','admin123','manager'),
('Staff','staff@stocksense.com','staff123','staff');

INSERT INTO products(name,sku,category_id,warehouse_id,unit,stock)
VALUES
('Steel Rod','STL001',1,1,'Kg',100),
('Office Chair','CHR001',2,1,'Pieces',50),
('Monitor','MON001',3,2,'Pieces',30);