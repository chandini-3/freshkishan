import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Enhanced Database Utility for Farmer Marketplace
 */
public class FarmerMarketplaceDB {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/farmer_marketplace";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "chandini33";
    private static final String DB_DRIVER = "com.mysql.cj.jdbc.Driver";
    
    static {
        try {
            Class.forName(DB_DRIVER);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("MySQL JDBC Driver not found", e);
        }
    }
    
    public static Connection getConnection() throws SQLException {
        return java.sql.DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
    }
    
    // User Management
    public static boolean registerUser(String username, String email, String password, 
                                     String phone, String userType, String firstName, 
                                     String lastName, String address) {
        String sql = "INSERT INTO users (username, email, password, phone, user_type, first_name, last_name, address, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, username);
            stmt.setString(2, email);
            stmt.setString(3, hashPassword(password));
            stmt.setString(4, phone);
            stmt.setString(5, userType);
            stmt.setString(6, firstName);
            stmt.setString(7, lastName);
            stmt.setString(8, address);
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public static User validateUser(String username, String password) {
        String sql = "SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ? AND is_active = TRUE";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, username);
            stmt.setString(2, username);
            stmt.setString(3, hashPassword(password));
            
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("phone"),
                    rs.getString("user_type"),
                    rs.getString("first_name"),
                    rs.getString("last_name"),
                    rs.getString("address"),
                    rs.getTimestamp("created_at")
                );
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    // Product Management
    public static boolean addProduct(int sellerId, String name, String description, 
                                   double price, String unit, String category, 
                                   int stockQuantity, String location, String imageUrl) {
        String sql = "INSERT INTO products (seller_id, name, description, price, unit, category, stock_quantity, location, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, sellerId);
            stmt.setString(2, name);
            stmt.setString(3, description);
            stmt.setDouble(4, price);
            stmt.setString(5, unit);
            stmt.setString(6, category);
            stmt.setInt(7, stockQuantity);
            stmt.setString(8, location);
            stmt.setString(9, imageUrl);
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public static List<Product> getAllProducts() {
        String sql = "SELECT p.*, u.username as seller_name, u.phone as seller_phone FROM products p JOIN users u ON p.seller_id = u.id WHERE p.is_active = TRUE ORDER BY p.created_at DESC";
        List<Product> products = new ArrayList<>();
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                products.add(new Product(
                    rs.getInt("id"),
                    rs.getInt("seller_id"),
                    rs.getString("name"),
                    rs.getString("description"),
                    rs.getDouble("price"),
                    rs.getString("unit"),
                    rs.getString("category"),
                    rs.getInt("stock_quantity"),
                    rs.getString("location"),
                    rs.getString("image_url"),
                    rs.getString("seller_name"),
                    rs.getString("seller_phone"),
                    rs.getTimestamp("created_at")
                ));
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return products;
    }
    
    public static List<Product> getProductsByCategory(String category) {
        String sql = "SELECT p.*, u.username as seller_name, u.phone as seller_phone FROM products p JOIN users u ON p.seller_id = u.id WHERE p.category = ? AND p.is_active = TRUE ORDER BY p.created_at DESC";
        List<Product> products = new ArrayList<>();
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, category);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                products.add(new Product(
                    rs.getInt("id"),
                    rs.getInt("seller_id"),
                    rs.getString("name"),
                    rs.getString("description"),
                    rs.getDouble("price"),
                    rs.getString("unit"),
                    rs.getString("category"),
                    rs.getInt("stock_quantity"),
                    rs.getString("location"),
                    rs.getString("image_url"),
                    rs.getString("seller_name"),
                    rs.getString("seller_phone"),
                    rs.getTimestamp("created_at")
                ));
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return products;
    }
    
    public static List<Product> searchProducts(String searchTerm) {
        String sql = "SELECT p.*, u.username as seller_name, u.phone as seller_phone FROM products p JOIN users u ON p.seller_id = u.id WHERE (p.name LIKE ? OR p.description LIKE ? OR p.category LIKE ?) AND p.is_active = TRUE ORDER BY p.created_at DESC";
        List<Product> products = new ArrayList<>();
        String searchPattern = "%" + searchTerm + "%";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, searchPattern);
            stmt.setString(2, searchPattern);
            stmt.setString(3, searchPattern);
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                products.add(new Product(
                    rs.getInt("id"),
                    rs.getInt("seller_id"),
                    rs.getString("name"),
                    rs.getString("description"),
                    rs.getDouble("price"),
                    rs.getString("unit"),
                    rs.getString("category"),
                    rs.getInt("stock_quantity"),
                    rs.getString("location"),
                    rs.getString("image_url"),
                    rs.getString("seller_name"),
                    rs.getString("seller_phone"),
                    rs.getTimestamp("created_at")
                ));
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return products;
    }
    
    // Order Management
    public static int createOrder(int buyerId, double totalAmount, String shippingAddress, String paymentMethod) {
        String orderNumber = "ORD" + System.currentTimeMillis();
        String sql = "INSERT INTO orders (buyer_id, order_number, total_amount, shipping_address, payment_method, status, created_at) VALUES (?, ?, ?, ?, ?, 'PENDING', NOW())";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {
            
            stmt.setInt(1, buyerId);
            stmt.setString(2, orderNumber);
            stmt.setDouble(3, totalAmount);
            stmt.setString(4, shippingAddress);
            stmt.setString(5, paymentMethod);
            
            int affectedRows = stmt.executeUpdate();
            if (affectedRows > 0) {
                ResultSet rs = stmt.getGeneratedKeys();
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return -1;
    }
    
    public static boolean addOrderItem(int orderId, int productId, int quantity, double unitPrice) {
        String sql = "INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, orderId);
            stmt.setInt(2, productId);
            stmt.setInt(3, quantity);
            stmt.setDouble(4, unitPrice);
            stmt.setDouble(5, unitPrice * quantity);
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    // Messaging System
    public static boolean sendMessage(int senderId, int receiverId, String subject, String message) {
        String sql = "INSERT INTO messages (sender_id, receiver_id, subject, message, sent_at) VALUES (?, ?, ?, ?, NOW())";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, senderId);
            stmt.setInt(2, receiverId);
            stmt.setString(3, subject);
            stmt.setString(4, message);
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    // Transport Services
    public static boolean bookTransport(int userId, String fromLocation, String toLocation, 
                                      double weight, String serviceType, double estimatedCost) {
        String sql = "INSERT INTO transport_bookings (user_id, from_location, to_location, weight, service_type, estimated_cost, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'PENDING', NOW())";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            stmt.setString(2, fromLocation);
            stmt.setString(3, toLocation);
            stmt.setDouble(4, weight);
            stmt.setString(5, serviceType);
            stmt.setDouble(6, estimatedCost);
            
            return stmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    // Utility Methods
    private static String hashPassword(String password) {
        // In production, use BCrypt or similar secure hashing
        // For demo purposes, using simple approach
        return password; // Replace with proper hashing
    }
    
    public static void logUserActivity(int userId, String activity, String details) {
        String sql = "INSERT INTO user_activity (user_id, activity, details, activity_time) VALUES (?, ?, ?, NOW())";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            stmt.setString(2, activity);
            stmt.setString(3, details);
            stmt.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    // Database Initialization
    public static void initializeDatabase() {
        try (Connection conn = getConnection()) {
            createTables(conn);
            insertSampleData(conn);
            System.out.println("Farmer Marketplace database initialized successfully!");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    private static void createTables(Connection conn) throws SQLException {
        // Users table
        String createUsersTable = """
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
                profile_image VARCHAR(255),
                is_verified BOOLEAN DEFAULT FALSE,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        """;
        
        // Products table
        String createProductsTable = """
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                seller_id INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                unit VARCHAR(20) DEFAULT 'per kg',
                category VARCHAR(50) NOT NULL,
                stock_quantity INT DEFAULT 0,
                location VARCHAR(100),
                image_url VARCHAR(255),
                quality_grade VARCHAR(20),
                harvest_date DATE,
                expiry_date DATE,
                is_organic BOOLEAN DEFAULT FALSE,
                is_active BOOLEAN DEFAULT TRUE,
                views_count INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (seller_id) REFERENCES users(id)
            )
        """;
        
        // Orders table
        String createOrdersTable = """
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                buyer_id INT NOT NULL,
                order_number VARCHAR(50) UNIQUE NOT NULL,
                total_amount DECIMAL(10,2) NOT NULL,
                shipping_cost DECIMAL(10,2) DEFAULT 0,
                tax_amount DECIMAL(10,2) DEFAULT 0,
                status ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
                shipping_address TEXT,
                billing_address TEXT,
                payment_method VARCHAR(50),
                payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
                delivery_date DATE,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (buyer_id) REFERENCES users(id)
            )
        """;
        
        // Order items table
        String createOrderItemsTable = """
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                seller_id INT NOT NULL,
                quantity INT NOT NULL,
                unit_price DECIMAL(10,2) NOT NULL,
                total_price DECIMAL(10,2) NOT NULL,
                status ENUM('PENDING', 'CONFIRMED', 'REJECTED') DEFAULT 'PENDING',
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (seller_id) REFERENCES users(id)
            )
        """;
        
        // Messages table
        String createMessagesTable = """
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                sender_id INT NOT NULL,
                receiver_id INT NOT NULL,
                subject VARCHAR(200),
                message TEXT NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (sender_id) REFERENCES users(id),
                FOREIGN KEY (receiver_id) REFERENCES users(id)
            )
        """;
        
        // Transport bookings table
        String createTransportTable = """
            CREATE TABLE IF NOT EXISTS transport_bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                from_location VARCHAR(100) NOT NULL,
                to_location VARCHAR(100) NOT NULL,
                weight DECIMAL(8,2) NOT NULL,
                service_type ENUM('STANDARD', 'EXPRESS', 'PREMIUM') DEFAULT 'STANDARD',
                estimated_cost DECIMAL(10,2),
                actual_cost DECIMAL(10,2),
                status ENUM('PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
                pickup_date DATE,
                delivery_date DATE,
                vehicle_details TEXT,
                driver_details TEXT,
                tracking_number VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """;
        
        // User activity table
        String createActivityTable = """
            CREATE TABLE IF NOT EXISTS user_activity (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                activity VARCHAR(100) NOT NULL,
                details TEXT,
                ip_address VARCHAR(45),
                activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """;
        
        // Reviews table
        String createReviewsTable = """
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT NOT NULL,
                buyer_id INT NOT NULL,
                seller_id INT NOT NULL,
                rating INT CHECK (rating BETWEEN 1 AND 5),
                review_text TEXT,
                is_verified_purchase BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (buyer_id) REFERENCES users(id),
                FOREIGN KEY (seller_id) REFERENCES users(id),
                UNIQUE KEY unique_product_buyer_review (product_id, buyer_id)
            )
        """;
        
        // Execute table creation
        conn.createStatement().execute(createUsersTable);
        conn.createStatement().execute(createProductsTable);
        conn.createStatement().execute(createOrdersTable);
        conn.createStatement().execute(createOrderItemsTable);
        conn.createStatement().execute(createMessagesTable);
        conn.createStatement().execute(createTransportTable);
        conn.createStatement().execute(createActivityTable);
        conn.createStatement().execute(createReviewsTable);
        
        // Create indexes
        String[] indexes = {
            "CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)",
            "CREATE INDEX IF NOT EXISTS idx_products_location ON products(location)",
            "CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id)",
            "CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id)",
            "CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)",
            "CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id)",
            "CREATE INDEX IF NOT EXISTS idx_activity_user ON user_activity(user_id)"
        };
        
        for (String index : indexes) {
            conn.createStatement().execute(index);
        }
    }
    
    private static void insertSampleData(Connection conn) throws SQLException {
        // Insert sample users
        String insertUsers = """
            INSERT IGNORE INTO users (username, email, password, phone, user_type, first_name, last_name, address) VALUES 
            ('farmer_raj', 'raj@farmer.com', 'password123', '+91-9876543210', 'SELLER', 'Raj', 'Kumar', 'Village Kharkhoda, Haryana'),
            ('trader_amit', 'amit@trader.com', 'password123', '+91-9876543211', 'BUYER', 'Amit', 'Sharma', 'Mandi Yard, Delhi'),
            ('organic_farm', 'organic@farm.com', 'password123', '+91-9876543212', 'SELLER', 'Lakshmi', 'Devi', 'Organic Valley, Karnataka'),
            ('wholesaler_ram', 'ram@wholesale.com', 'password123', '+91-9876543213', 'BUYER', 'Ram', 'Singh', 'Wholesale Market, Punjab')
        """;
        
        // Insert sample products
        String insertProducts = """
            INSERT IGNORE INTO products (seller_id, name, description, price, unit, category, stock_quantity, location, is_organic) VALUES 
            (1, 'Premium Basmati Rice', 'High quality basmati rice from Punjab farms', 120.00, 'per kg', 'grains', 500, 'Punjab', FALSE),
            (1, 'Organic Wheat', 'Certified organic wheat, pesticide-free', 45.00, 'per kg', 'grains', 1000, 'Haryana', TRUE),
            (3, 'Fresh Tomatoes', 'Fresh red tomatoes, harvested today', 40.00, 'per kg', 'vegetables', 200, 'Karnataka', TRUE),
            (3, 'Organic Onions', 'Quality organic onions, perfect for wholesale', 35.00, 'per kg', 'vegetables', 800, 'Karnataka', TRUE),
            (1, 'Yellow Corn', 'High quality yellow corn for feed and processing', 25.00, 'per kg', 'grains', 2000, 'Punjab', FALSE),
            (3, 'Fresh Potatoes', 'Farm fresh potatoes, multiple varieties available', 30.00, 'per kg', 'vegetables', 1500, 'Karnataka', FALSE)
        """;
        
        conn.createStatement().execute(insertUsers);
        conn.createStatement().execute(insertProducts);
    }
    
    public static void main(String[] args) {
        initializeDatabase();
    }
}

// User class
class User {
    private int id;
    private String username;
    private String email;
    private String phone;
    private String userType;
    private String firstName;
    private String lastName;
    private String address;
    private Timestamp createdAt;
    
    public User(int id, String username, String email, String phone, String userType, 
                String firstName, String lastName, String address, Timestamp createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.userType = userType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.createdAt = createdAt;
    }
    
    // Getters
    public int getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getUserType() { return userType; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getAddress() { return address; }
    public Timestamp getCreatedAt() { return createdAt; }
}

// Product class
class Product {
    private int id;
    private int sellerId;
    private String name;
    private String description;
    private double price;
    private String unit;
    private String category;
    private int stockQuantity;
    private String location;
    private String imageUrl;
    private String sellerName;
    private String sellerPhone;
    private Timestamp createdAt;
    
    public Product(int id, int sellerId, String name, String description, double price, 
                   String unit, String category, int stockQuantity, String location, 
                   String imageUrl, String sellerName, String sellerPhone, Timestamp createdAt) {
        this.id = id;
        this.sellerId = sellerId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.unit = unit;
        this.category = category;
        this.stockQuantity = stockQuantity;
        this.location = location;
        this.imageUrl = imageUrl;
        this.sellerName = sellerName;
        this.sellerPhone = sellerPhone;
        this.createdAt = createdAt;
    }
    
    // Getters
    public int getId() { return id; }
    public int getSellerId() { return sellerId; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public double getPrice() { return price; }
    public String getUnit() { return unit; }
    public String getCategory() { return category; }
    public int getStockQuantity() { return stockQuantity; }
    public String getLocation() { return location; }
    public String getImageUrl() { return imageUrl; }
    public String getSellerName() { return sellerName; }
    public String getSellerPhone() { return sellerPhone; }
    public Timestamp getCreatedAt() { return createdAt; }
}
