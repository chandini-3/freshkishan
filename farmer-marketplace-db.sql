-- Farmer Marketplace Database Setup Script
-- Run this script in your MySQL database

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS farmer_marketplace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE farmer_marketplace;

-- Users table - for farmers, buyers, traders
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_type ENUM('BUYER', 'SELLER', 'BOTH') DEFAULT 'BOTH',
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address TEXT,
    district VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    profile_image VARCHAR(255),
    aadhar_number VARCHAR(12),
    pan_number VARCHAR(10),
    bank_account VARCHAR(20),
    ifsc_code VARCHAR(11),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table - agricultural products for sale
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'per kg',
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    stock_quantity INT DEFAULT 0,
    minimum_order_quantity INT DEFAULT 1,
    location VARCHAR(100),
    district VARCHAR(50),
    state VARCHAR(50),
    image_url VARCHAR(255),
    additional_images TEXT, -- JSON array of image URLs
    quality_grade VARCHAR(20),
    harvest_date DATE,
    expiry_date DATE,
    is_organic BOOLEAN DEFAULT FALSE,
    is_certified BOOLEAN DEFAULT FALSE,
    certification_details TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    inquiry_count INT DEFAULT 0,
    sold_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Product categories master table
CREATE TABLE IF NOT EXISTS product_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    category_image VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    commission_amount DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',
    shipping_address TEXT,
    billing_address TEXT,
    payment_method VARCHAR(50),
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIAL') DEFAULT 'PENDING',
    payment_reference VARCHAR(100),
    expected_delivery_date DATE,
    actual_delivery_date DATE,
    notes TEXT,
    cancellation_reason TEXT,
    refund_amount DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    seller_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 5.00,
    commission_amount DECIMAL(10,2) DEFAULT 0,
    seller_amount DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'SHIPPED', 'DELIVERED') DEFAULT 'PENDING',
    rejection_reason TEXT,
    tracking_number VARCHAR(50),
    estimated_delivery DATE,
    actual_delivery DATE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- Messages/Chat system
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    product_id INT NULL,
    order_id INT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    message_type ENUM('INQUIRY', 'ORDER', 'SUPPORT', 'GENERAL') DEFAULT 'GENERAL',
    is_read BOOLEAN DEFAULT FALSE,
    is_important BOOLEAN DEFAULT FALSE,
    parent_message_id INT NULL,
    attachments TEXT, -- JSON array of file URLs
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (parent_message_id) REFERENCES messages(id)
);

-- Transport/Logistics bookings
CREATE TABLE IF NOT EXISTS transport_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_id INT NULL,
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    from_location VARCHAR(100) NOT NULL,
    from_pincode VARCHAR(10),
    to_location VARCHAR(100) NOT NULL,
    to_pincode VARCHAR(10),
    distance_km DECIMAL(8,2),
    weight_kg DECIMAL(8,2) NOT NULL,
    volume_cubic_meter DECIMAL(8,2),
    vehicle_type ENUM('MINI_TRUCK', 'SMALL_TRUCK', 'MEDIUM_TRUCK', 'LARGE_TRUCK', 'CONTAINER') DEFAULT 'SMALL_TRUCK',
    service_type ENUM('STANDARD', 'EXPRESS', 'PREMIUM', 'SAME_DAY') DEFAULT 'STANDARD',
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    advance_payment DECIMAL(10,2) DEFAULT 0,
    status ENUM('PENDING', 'CONFIRMED', 'PICKUP_SCHEDULED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    pickup_date DATE,
    pickup_time TIME,
    delivery_date DATE,
    delivery_time TIME,
    actual_pickup_time TIMESTAMP NULL,
    actual_delivery_time TIMESTAMP NULL,
    vehicle_details TEXT,
    driver_name VARCHAR(100),
    driver_phone VARCHAR(20),
    tracking_number VARCHAR(50),
    gps_tracking_url VARCHAR(255),
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Quality inspection services
CREATE TABLE IF NOT EXISTS inspection_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NULL,
    inspection_type ENUM('PRE_HARVEST', 'POST_HARVEST', 'PACKAGING', 'EXPORT_QUALITY') DEFAULT 'POST_HARVEST',
    location VARCHAR(100) NOT NULL,
    quantity_to_inspect DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    inspection_date DATE,
    inspection_time TIME,
    inspector_id INT NULL,
    status ENUM('PENDING', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    inspection_cost DECIMAL(10,2),
    quality_grade VARCHAR(20),
    quality_score DECIMAL(3,1),
    inspection_report TEXT,
    certification_issued BOOLEAN DEFAULT FALSE,
    certificate_url VARCHAR(255),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (inspector_id) REFERENCES users(id)
);

-- Insurance services
CREATE TABLE IF NOT EXISTS insurance_policies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    policy_number VARCHAR(50) UNIQUE NOT NULL,
    policy_type ENUM('CROP', 'TRANSPORT', 'STORAGE', 'EQUIPMENT', 'LIVESTOCK') DEFAULT 'CROP',
    coverage_amount DECIMAL(12,2) NOT NULL,
    premium_amount DECIMAL(10,2) NOT NULL,
    coverage_details TEXT,
    policy_start_date DATE NOT NULL,
    policy_end_date DATE NOT NULL,
    status ENUM('ACTIVE', 'EXPIRED', 'CANCELLED', 'CLAIMED') DEFAULT 'ACTIVE',
    insurance_company VARCHAR(100),
    agent_details TEXT,
    premium_payment_status ENUM('PENDING', 'PAID', 'OVERDUE') DEFAULT 'PENDING',
    claim_amount DECIMAL(10,2) DEFAULT 0,
    claim_status ENUM('NONE', 'PENDING', 'APPROVED', 'REJECTED', 'SETTLED') DEFAULT 'NONE',
    documents TEXT, -- JSON array of document URLs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Warehouse/Storage services
CREATE TABLE IF NOT EXISTS warehouse_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    storage_type ENUM('NORMAL', 'COLD_STORAGE', 'CONTROLLED_ATMOSPHERE', 'FUMIGATED') DEFAULT 'NORMAL',
    storage_duration_days INT NOT NULL,
    rate_per_day DECIMAL(8,2),
    total_cost DECIMAL(10,2),
    advance_payment DECIMAL(10,2) DEFAULT 0,
    check_in_date DATE,
    check_out_date DATE,
    actual_check_in TIMESTAMP NULL,
    actual_check_out TIMESTAMP NULL,
    status ENUM('PENDING', 'CONFIRMED', 'CHECKED_IN', 'STORED', 'CHECKED_OUT', 'CANCELLED') DEFAULT 'PENDING',
    storage_conditions TEXT,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Warehouse master table
CREATE TABLE IF NOT EXISTS warehouses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    district VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    capacity_metric_tons DECIMAL(10,2),
    available_capacity DECIMAL(10,2),
    storage_types TEXT, -- JSON array of supported storage types
    facilities TEXT, -- JSON array of available facilities
    contact_person VARCHAR(100),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(100),
    rate_per_day DECIMAL(8,2),
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User activity tracking
CREATE TABLE IF NOT EXISTS user_activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    activity_description TEXT,
    entity_type VARCHAR(50), -- 'PRODUCT', 'ORDER', 'MESSAGE', etc.
    entity_id INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    location VARCHAR(100),
    activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Reviews and ratings
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reviewer_id INT NOT NULL,
    reviewed_user_id INT NOT NULL,
    product_id INT NULL,
    order_id INT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_title VARCHAR(200),
    review_text TEXT,
    review_type ENUM('PRODUCT', 'SELLER', 'BUYER', 'SERVICE') DEFAULT 'PRODUCT',
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    helpful_votes INT DEFAULT 0,
    total_votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    UNIQUE KEY unique_review (reviewer_id, reviewed_user_id, product_id, order_id)
);

-- Price history tracking
CREATE TABLE IF NOT EXISTS price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20),
    location VARCHAR(100),
    market VARCHAR(100),
    recorded_date DATE NOT NULL,
    recorded_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Market prices (daily updates)
CREATE TABLE IF NOT EXISTS market_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    market_name VARCHAR(100) NOT NULL,
    state VARCHAR(50),
    district VARCHAR(50),
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    average_price DECIMAL(10,2),
    unit VARCHAR(20) DEFAULT 'per kg',
    date DATE NOT NULL,
    source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_market_product_date (product_name, market_name, date)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type ENUM('ORDER', 'PAYMENT', 'TRANSPORT', 'INSPECTION', 'INSURANCE', 'GENERAL', 'PROMOTIONAL') DEFAULT 'GENERAL',
    entity_type VARCHAR(50),
    entity_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    is_important BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert master data for product categories
INSERT IGNORE INTO product_categories (category_name, description) VALUES 
('Grains', 'Rice, Wheat, Corn, Barley, Millet and other cereal grains'),
('Pulses', 'Lentils, Chickpeas, Black gram, Green gram and other legumes'),
('Vegetables', 'Fresh vegetables including leafy greens, root vegetables, and seasonal produce'),
('Fruits', 'Fresh fruits including seasonal and exotic varieties'),
('Spices', 'Whole and ground spices, herbs and aromatic plants'),
('Oil Seeds', 'Groundnut, Sunflower, Sesame, Mustard and other oil-bearing seeds'),
('Cotton', 'Raw cotton and cotton-related products'),
('Sugarcane', 'Sugarcane and sugar-related products'),
('Tea & Coffee', 'Tea leaves, coffee beans and related products'),
('Dairy Products', 'Milk, Cheese, Butter and other dairy items'),
('Poultry', 'Eggs, Chicken and other poultry products'),
('Livestock', 'Cattle, Buffalo, Goat, Sheep and related products'),
('Fisheries', 'Fresh and processed fish and seafood'),
('Floriculture', 'Flowers, ornamental plants and gardening supplies'),
('Seeds', 'Agricultural seeds for various crops'),
('Fertilizers', 'Organic and chemical fertilizers, soil conditioners'),
('Pesticides', 'Crop protection chemicals and organic alternatives'),
('Tools & Equipment', 'Agricultural tools, machinery and equipment'),
('Feed', 'Animal feed and fodder');

-- Insert sample users (farmers, traders, buyers)
INSERT IGNORE INTO users (username, email, password, phone, user_type, first_name, last_name, address, district, state, pincode) VALUES 
('farmer_rajesh', 'rajesh@farmer.com', 'password123', '+91-9876543210', 'SELLER', 'Rajesh', 'Kumar', 'Village Kharkhoda', 'Sonipat', 'Haryana', '131402'),
('trader_amit', 'amit@trader.com', 'password123', '+91-9876543211', 'BUYER', 'Amit', 'Sharma', 'Mandi Yard, Sector 26', 'Delhi', 'Delhi', '110001'),
('organic_lakshmi', 'lakshmi@organic.com', 'password123', '+91-9876543212', 'SELLER', 'Lakshmi', 'Devi', 'Organic Valley, Kolar', 'Kolar', 'Karnataka', '563101'),
('wholesaler_ram', 'ram@wholesale.com', 'password123', '+91-9876543213', 'BUYER', 'Ram', 'Singh', 'Wholesale Market, Model Town', 'Ludhiana', 'Punjab', '141002'),
('farmer_suresh', 'suresh@farmer.com', 'password123', '+91-9876543214', 'BOTH', 'Suresh', 'Patel', 'Village Anand', 'Anand', 'Gujarat', '388001'),
('export_house', 'export@agri.com', 'password123', '+91-9876543215', 'BUYER', 'Agri', 'Exports', 'Export House, Marine Drive', 'Mumbai', 'Maharashtra', '400001');

-- Insert sample products
INSERT IGNORE INTO products (seller_id, name, description, price, unit, category, subcategory, stock_quantity, minimum_order_quantity, location, district, state, quality_grade, is_organic, is_certified) VALUES 
(1, 'Premium Basmati Rice', 'High quality basmati rice from Punjab farms with long grains and excellent aroma', 120.00, 'per kg', 'Grains', 'Rice', 5000, 100, 'Kharkhoda Village', 'Sonipat', 'Haryana', 'Grade A', FALSE, TRUE),
(1, 'Organic Wheat', 'Certified organic wheat, pesticide-free and naturally grown', 45.00, 'per kg', 'Grains', 'Wheat', 10000, 500, 'Kharkhoda Village', 'Sonipat', 'Haryana', 'Grade A', TRUE, TRUE),
(3, 'Fresh Tomatoes', 'Fresh red tomatoes, harvested today, perfect for wholesale markets', 40.00, 'per kg', 'Vegetables', 'Tomato', 2000, 50, 'Organic Valley', 'Kolar', 'Karnataka', 'Grade A', TRUE, TRUE),
(3, 'Organic Onions', 'Quality organic onions, perfect for wholesale and export', 35.00, 'per kg', 'Vegetables', 'Onion', 8000, 100, 'Organic Valley', 'Kolar', 'Karnataka', 'Grade A', TRUE, TRUE),
(1, 'Yellow Corn', 'High quality yellow corn suitable for feed and food processing', 25.00, 'per kg', 'Grains', 'Corn', 20000, 1000, 'Kharkhoda Village', 'Sonipat', 'Haryana', 'Grade B', FALSE, FALSE),
(3, 'Fresh Potatoes', 'Farm fresh potatoes, multiple varieties available for bulk purchase', 30.00, 'per kg', 'Vegetables', 'Potato', 15000, 200, 'Organic Valley', 'Kolar', 'Karnataka', 'Grade A', FALSE, FALSE),
(5, 'Organic Turmeric', 'Pure organic turmeric powder, freshly ground from quality roots', 180.00, 'per kg', 'Spices', 'Turmeric', 500, 10, 'Anand Village', 'Anand', 'Gujarat', 'Premium', TRUE, TRUE),
(5, 'Fresh Mangoes', 'Sweet Alphonso mangoes, export quality fruit from Gujarat orchards', 150.00, 'per kg', 'Fruits', 'Mango', 1000, 25, 'Anand Village', 'Anand', 'Gujarat', 'Export Grade', FALSE, TRUE),
(1, 'Mustard Seeds', 'Quality mustard seeds suitable for oil extraction and spice making', 80.00, 'per kg', 'Oil Seeds', 'Mustard', 3000, 100, 'Kharkhoda Village', 'Sonipat', 'Haryana', 'Grade A', FALSE, FALSE),
(5, 'Groundnut Oil', 'Cold-pressed groundnut oil, pure and natural without any additives', 200.00, 'per liter', 'Oil Seeds', 'Groundnut Oil', 800, 20, 'Anand Village', 'Anand', 'Gujarat', 'Premium', TRUE, TRUE);

-- Insert sample warehouses
INSERT IGNORE INTO warehouses (name, location, district, state, pincode, capacity_metric_tons, available_capacity, contact_person, contact_phone, rate_per_day) VALUES 
('Green Valley Storage', 'Industrial Area, Sonipat', 'Sonipat', 'Haryana', '131001', 1000.00, 750.00, 'Manager Singh', '+91-9876543220', 2.50),
('Karnataka Agri Warehouse', 'APMC Yard, Kolar', 'Kolar', 'Karnataka', '563101', 1500.00, 1200.00, 'Storage Admin', '+91-9876543221', 2.00),
('Punjab Grain Storage', 'Mandi Complex, Ludhiana', 'Ludhiana', 'Punjab', '141001', 2000.00, 1800.00, 'Warehouse Head', '+91-9876543222', 3.00),
('Gujarat Cold Storage', 'Industrial Estate, Anand', 'Anand', 'Gujarat', '388001', 800.00, 600.00, 'Cold Storage Manager', '+91-9876543223', 5.00);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_location ON products(location);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_activity_user ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_time ON user_activity(activity_time);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(reviewed_user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_transport_user ON transport_bookings(user_id);

-- Create views for common queries
CREATE OR REPLACE VIEW active_products_view AS
SELECT 
    p.*,
    u.username as seller_username,
    u.first_name as seller_first_name,
    u.last_name as seller_last_name,
    u.phone as seller_phone,
    u.rating as seller_rating,
    pc.category_name,
    COALESCE(AVG(r.rating), 0) as avg_rating,
    COUNT(r.id) as review_count
FROM products p
JOIN users u ON p.seller_id = u.id
LEFT JOIN product_categories pc ON p.category = pc.category_name
LEFT JOIN reviews r ON p.id = r.product_id AND r.review_type = 'PRODUCT'
WHERE p.is_active = TRUE AND u.is_active = TRUE
GROUP BY p.id;

CREATE OR REPLACE VIEW user_order_summary AS
SELECT 
    u.id as user_id,
    u.username,
    u.user_type,
    COUNT(DISTINCT CASE WHEN o.buyer_id = u.id THEN o.id END) as total_purchases,
    COUNT(DISTINCT CASE WHEN oi.seller_id = u.id THEN oi.order_id END) as total_sales,
    COALESCE(SUM(CASE WHEN o.buyer_id = u.id THEN o.total_amount END), 0) as total_purchase_amount,
    COALESCE(SUM(CASE WHEN oi.seller_id = u.id THEN oi.seller_amount END), 0) as total_sale_amount,
    MAX(CASE WHEN o.buyer_id = u.id THEN o.created_at END) as last_purchase_date,
    MAX(CASE WHEN oi.seller_id = u.id THEN oi.order_id END) as last_sale_date
FROM users u
LEFT JOIN orders o ON u.id = o.buyer_id
LEFT JOIN order_items oi ON u.id = oi.seller_id
GROUP BY u.id, u.username, u.user_type;

CREATE OR REPLACE VIEW market_summary AS
SELECT 
    p.category,
    p.location,
    COUNT(*) as product_count,
    AVG(p.price) as avg_price,
    MIN(p.price) as min_price,
    MAX(p.price) as max_price,
    SUM(p.stock_quantity) as total_stock
FROM products p
WHERE p.is_active = TRUE
GROUP BY p.category, p.location;

COMMIT;

-- Display setup completion message
SELECT 'Farmer Marketplace database setup completed successfully!' as Status,
       'Database: farmer_marketplace' as Database_Name,
       'Tables created with sample data' as Details;
