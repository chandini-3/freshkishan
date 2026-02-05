CREATE DATABASE IF NOT EXISTS farm_to_table;
USE farm_to_table;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, description, price) VALUES
('Organic Carrots', 'Fresh and crunchy carrots', 2.50),
('Tomatoes', 'Juicy ripe tomatoes', 3.00),
('Cucumbers', 'Crisp and refreshing cucumbers', 1.50);
