-- Insert sample products for testing cart functionality
USE farmer_marketplace;

-- First, let's check if products exist
SELECT COUNT(*) as product_count FROM products;

-- Insert sample products if they don't exist
INSERT IGNORE INTO products (id, name, category, price, stock_quantity, seller_id, image_url, description) VALUES
(1, 'Organic Tomatoes', 'Vegetables', 40.00, 100, 1, 'tomatoes.jpg', 'Fresh organic tomatoes from local farms'),
(2, 'Organic Potatoes', 'Vegetables', 25.00, 150, 1, 'potatoes.jpg', 'High quality organic potatoes'),
(3, 'Fresh Carrots', 'Vegetables', 35.00, 80, 1, 'carrots.jpg', 'Sweet and crunchy fresh carrots'),
(4, 'Fresh Onions', 'Vegetables', 30.00, 120, 1, 'onions.jpg', 'Farm fresh onions'),
(5, 'Organic Cabbage', 'Vegetables', 20.00, 60, 1, 'cabbage.jpg', 'Fresh organic cabbage leaves'),
(6, 'Garden Seeds Mix', 'Seeds', 15.00, 200, 1, 'seeds.jpg', 'Premium mixed vegetable seeds');

-- Check if cart table exists
SHOW TABLES LIKE 'cart';

-- Check products were inserted
SELECT id, name, price, stock_quantity FROM products;
