-- Complete database setup for Enhanced Garden E-Commerce
USE farmer_marketplace;

-- Create cart table if it doesn't exist
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Insert sample products for the enhanced garden ecommerce site
INSERT IGNORE INTO products (id, name, category, price, stock_quantity, seller_id, image_url, description, created_at) VALUES
(1, 'Organic Tomatoes', 'Vegetables', 40.00, 100, 1, 'images/tomatoes.jpg', 'Fresh, red organic tomatoes harvested this morning. Rich in vitamins and perfect for salads, cooking, or eating fresh.', NOW()),
(2, 'Organic Potatoes', 'Vegetables', 25.00, 150, 1, 'images/potatoes.jpg', 'Fresh organic potatoes grown without chemicals. Great source of energy and perfect for various cooking methods.', NOW()),
(3, 'Fresh Carrots', 'Vegetables', 35.00, 80, 1, 'images/carrots.jpg', 'Sweet, crunchy organic carrots rich in beta-carotene and perfect for cooking or snacking.', NOW()),
(4, 'Fresh Onions', 'Vegetables', 30.00, 120, 1, 'images/onions.jpg', 'Fresh, pungent onions essential for cooking. Grown without pesticides in rich soil.', NOW()),
(5, 'Organic Cabbage', 'Vegetables', 20.00, 60, 1, 'images/cabbage.jpg', 'Fresh green cabbage heads perfect for salads, cooking, or making traditional dishes.', NOW()),
(6, 'Garden Seeds Mix', 'Seeds', 15.00, 200, 1, 'images/seeds.jpg', 'Premium mixed vegetable seeds for your home garden.', NOW());

-- Show what we've created
SELECT 'Products created:' as info;
SELECT id, name, price, stock_quantity FROM products;

SELECT 'Cart table structure:' as info;
DESCRIBE cart;

SELECT 'Database setup complete!' as result;
