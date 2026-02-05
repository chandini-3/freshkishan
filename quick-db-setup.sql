-- Quick Database Setup for Cart Testing
-- Run this in MySQL to ensure test data exists

USE farmer_marketplace;

-- Create test users if they don't exist
INSERT IGNORE INTO users (id, username, password, full_name, email, user_type) VALUES 
(1, 'testuser', 'test123', 'Test Customer', 'test@farmmarket.com', 'customer'),
(2, 'demo', 'demo123', 'Demo User', 'demo@farmmarket.com', 'customer');

-- Create test products if they don't exist
INSERT IGNORE INTO products (id, name, price, category, farmer_id, stock_quantity, description) VALUES
(1, 'Organic Tomatoes', 40.00, 'vegetables', 1, 100, 'Fresh organic tomatoes'),
(2, 'Organic Potatoes', 25.00, 'vegetables', 1, 150, 'Fresh organic potatoes'),
(3, 'Fresh Carrots', 35.00, 'vegetables', 1, 80, 'Fresh organic carrots'),
(4, 'Fresh Onions', 30.00, 'vegetables', 1, 120, 'Fresh organic onions'),
(5, 'Organic Cabbage', 20.00, 'vegetables', 1, 90, 'Fresh organic cabbage'),
(6, 'Garden Seeds Mix', 15.00, 'seeds', 1, 50, 'Mixed garden seeds');

-- Clear any existing cart items for test user
DELETE FROM cart WHERE user_id = 1;

-- Show current data
SELECT 'Users:' as table_name;
SELECT id, username, full_name FROM users;

SELECT 'Products:' as table_name;
SELECT id, name, price FROM products;

SELECT 'Cart:' as table_name;
SELECT c.*, p.name FROM cart c LEFT JOIN products p ON c.product_id = p.id WHERE c.user_id = 1;
