DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(45) NULL,
  price FLOAT4 NULL,
  stock_quantity SMALLINT NULL,  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Duck and Hippo In the Rainstorm", "Books", 10.99, 34), ("Bamazon Becho", "Tech", 99.99, 149), ("Beef Jerky Variety Bag", "Snacks", 14.99, 70), ("Bamazon Classic Backpack", "School", 17.82, 44), ("LCD Thermometer", "Tech", 6.80, 3), ("Diamond Clean Classic Electric Toothbrush", "Health", 199.99, 21), ("Abstract Black and White Print", "Art", 150.99, 1), ("Husqvara Lawn Mower", "Lawn and Yard", 299.95, 16), ("Dash Button", "Household", 4.99, 23), ("KRUMPS Coffee Grinder", "Kitchen", 29.99, 62);