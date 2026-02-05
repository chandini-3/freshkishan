import java.io.*;
import java.sql.*;
import java.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class OrderServlet extends HttpServlet {
    
    private Connection getConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/farmer_marketplace";
        String dbUser = "root";
        String dbPassword = "";
        return DriverManager.getConnection(url, dbUser, dbPassword);
    }
    
    // Create order from cart
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user_id") == null) {
            out.println("{\"success\": false, \"message\": \"Please login first\"}");
            return;
        }
        
        int userId = (Integer) session.getAttribute("user_id");
        String action = request.getParameter("action");
        
        try {
            if ("create_order".equals(action)) {
                createOrder(request, userId, out);
            } else if ("get_orders".equals(action)) {
                getUserOrders(userId, out);
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.println("{\"success\": false, \"message\": \"Error: " + e.getMessage() + "\"}");
        }
    }
    
    private void createOrder(HttpServletRequest request, int userId, PrintWriter out) throws Exception {
        
        String shippingAddress = request.getParameter("shipping_address");
        String paymentMethod = request.getParameter("payment_method");
        String deliveryTime = request.getParameter("delivery_time");
        String specialInstructions = request.getParameter("special_instructions");
        
        Connection conn = null;
        try {
            conn = getConnection();
            conn.setAutoCommit(false);
            
            // Get cart items from database
            String cartSql = "SELECT c.product_id, c.quantity, p.price, p.name, p.seller_id FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?";
            PreparedStatement cartStmt = conn.prepareStatement(cartSql);
            cartStmt.setInt(1, userId);
            ResultSet cartRs = cartStmt.executeQuery();
            
            List<Map<String, Object>> cartItems = new ArrayList<>();
            double totalAmount = 0;
            
            while (cartRs.next()) {
                Map<String, Object> item = new HashMap<>();
                item.put("product_id", cartRs.getInt("product_id"));
                item.put("quantity", cartRs.getInt("quantity"));
                item.put("price", cartRs.getDouble("price"));
                item.put("name", cartRs.getString("name"));
                item.put("seller_id", cartRs.getInt("seller_id"));
                
                double itemTotal = cartRs.getDouble("price") * cartRs.getInt("quantity");
                item.put("item_total", itemTotal);
                totalAmount += itemTotal;
                
                cartItems.add(item);
            }
            
            if (cartItems.isEmpty()) {
                out.println("{\"success\": false, \"message\": \"Cart is empty\"}");
                return;
            }
            
            // Generate order number
            String orderNumber = "ORD" + System.currentTimeMillis();
            
            // Calculate delivery date (next day)
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DAY_OF_MONTH, 1);
            java.sql.Date expectedDeliveryDate = new java.sql.Date(cal.getTimeInMillis());
            
            // Create order
            String orderSql = "INSERT INTO orders (buyer_id, order_number, total_amount, net_amount, status, shipping_address, payment_method, expected_delivery_date, notes) VALUES (?, ?, ?, ?, 'PENDING', ?, ?, ?, ?)";
            
            PreparedStatement orderStmt = conn.prepareStatement(orderSql, Statement.RETURN_GENERATED_KEYS);
            orderStmt.setInt(1, userId);
            orderStmt.setString(2, orderNumber);
            orderStmt.setDouble(3, totalAmount);
            orderStmt.setDouble(4, totalAmount);
            orderStmt.setString(5, shippingAddress);
            orderStmt.setString(6, paymentMethod);
            orderStmt.setDate(7, expectedDeliveryDate);
            orderStmt.setString(8, "Delivery Time: " + deliveryTime + (specialInstructions != null ? ". Instructions: " + specialInstructions : ""));
            
            orderStmt.executeUpdate();
            
            ResultSet generatedKeys = orderStmt.getGeneratedKeys();
            if (!generatedKeys.next()) {
                throw new SQLException("Creating order failed, no ID obtained.");
            }
            int orderId = generatedKeys.getInt(1);
            
            // Create order items
            String orderItemSql = "INSERT INTO order_items (order_id, product_id, seller_id, quantity, unit_price, total_price, seller_amount) VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement itemStmt = conn.prepareStatement(orderItemSql);
            
            for (Map<String, Object> item : cartItems) {
                int productId = (Integer) item.get("product_id");
                int quantity = (Integer) item.get("quantity");
                double price = (Double) item.get("price");
                int sellerId = (Integer) item.get("seller_id");
                double itemTotal = (Double) item.get("item_total");
                
                itemStmt.setInt(1, orderId);
                itemStmt.setInt(2, productId);
                itemStmt.setInt(3, sellerId);
                itemStmt.setInt(4, quantity);
                itemStmt.setDouble(5, price);
                itemStmt.setDouble(6, itemTotal);
                itemStmt.setDouble(7, itemTotal * 0.95); // 5% commission
                
                itemStmt.executeUpdate();
            }
            
            // Clear cart after successful order
            String clearCartSql = "DELETE FROM cart WHERE user_id = ?";
            PreparedStatement clearStmt = conn.prepareStatement(clearCartSql);
            clearStmt.setInt(1, userId);
            clearStmt.executeUpdate();
            
            // Commit transaction
            conn.commit();
            
            // Return success response
            out.println("{\"success\": true, \"message\": \"Order placed successfully!\", \"order_id\": " + orderId + ", \"order_number\": \"" + orderNumber + "\", \"total_amount\": " + totalAmount + ", \"expected_delivery\": \"" + expectedDeliveryDate.toString() + "\"}");
            
        } catch (Exception e) {
            if (conn != null) {
                conn.rollback();
            }
            throw e;
        } finally {
            if (conn != null) {
                conn.setAutoCommit(true);
                conn.close();
            }
        }
    }
    
    private void getUserOrders(int userId, PrintWriter out) throws Exception {
        
        Connection conn = null;
        try {
            conn = getConnection();
            
            String sql = "SELECT o.id, o.order_number, o.total_amount, o.status, o.payment_method, o.created_at, o.expected_delivery_date, COUNT(oi.id) as item_count FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id WHERE o.buyer_id = ? GROUP BY o.id ORDER BY o.created_at DESC";
            
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();
            
            StringBuilder result = new StringBuilder();
            result.append("{\"success\": true, \"orders\": [");
            
            boolean first = true;
            while (rs.next()) {
                if (!first) {
                    result.append(",");
                }
                first = false;
                
                result.append("{");
                result.append("\"id\":").append(rs.getInt("id")).append(",");
                result.append("\"order_number\":\"").append(rs.getString("order_number")).append("\",");
                result.append("\"total_amount\":").append(rs.getDouble("total_amount")).append(",");
                result.append("\"status\":\"").append(rs.getString("status")).append("\",");
                result.append("\"payment_method\":\"").append(rs.getString("payment_method") != null ? rs.getString("payment_method") : "").append("\",");
                result.append("\"created_at\":\"").append(rs.getTimestamp("created_at").toString()).append("\",");
                
                java.sql.Date deliveryDate = rs.getDate("expected_delivery_date");
                if (deliveryDate != null) {
                    result.append("\"expected_delivery_date\":\"").append(deliveryDate.toString()).append("\",");
                } else {
                    result.append("\"expected_delivery_date\":null,");
                }
                
                result.append("\"item_count\":").append(rs.getInt("item_count"));
                result.append("}");
            }
            
            result.append("]}");
            out.println(result.toString());
            
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
    }
}
