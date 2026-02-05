import java.io.*;
import java.sql.*;
import java.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class CartServlet extends HttpServlet {
    
    private Connection getConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/farmer_marketplace";
        String dbUser = "root";
        String dbPassword = "";
        return DriverManager.getConnection(url, dbUser, dbPassword);
    }
    
    // Add item to cart
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
            if ("add".equals(action)) {
                addToCart(request, response, userId, out);
            } else if ("update".equals(action)) {
                updateCartItem(request, response, userId, out);
            } else if ("remove".equals(action)) {
                removeFromCart(request, response, userId, out);
            } else if ("clear".equals(action)) {
                clearCart(request, response, userId, out);
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.println("{\"success\": false, \"message\": \"Error: " + e.getMessage() + "\"}");
        }
    }
    
    // Get cart items
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
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
        
        try (Connection conn = getConnection()) {
            String sql = """
                SELECT c.id, c.product_id, c.quantity, c.added_at,
                       p.name, p.price, p.unit, p.image_url,
                       u.first_name as farmer_name
                FROM cart c
                JOIN products p ON c.product_id = p.id
                JOIN users u ON p.seller_id = u.id
                WHERE c.user_id = ?
                ORDER BY c.added_at DESC
            """;
            
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();
            
            List<Map<String, Object>> cartItems = new ArrayList<>();
            double totalAmount = 0;
            
            while (rs.next()) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", rs.getInt("id"));
                item.put("product_id", rs.getInt("product_id"));
                item.put("name", rs.getString("name"));
                item.put("price", rs.getDouble("price"));
                item.put("unit", rs.getString("unit"));
                item.put("quantity", rs.getInt("quantity"));
                item.put("farmer_name", rs.getString("farmer_name"));
                item.put("image_url", rs.getString("image_url"));
                
                double itemTotal = rs.getDouble("price") * rs.getInt("quantity");
                item.put("item_total", itemTotal);
                totalAmount += itemTotal;
                
                cartItems.add(item);
            }
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("cart_items", cartItems);
            result.put("total_amount", totalAmount);
            result.put("item_count", cartItems.size());
            
            // Build JSON response manually
            StringBuilder jsonResult = new StringBuilder();
            jsonResult.append("{\"success\": true, \"cart_items\": [");
            for (int i = 0; i < cartItems.size(); i++) {
                Map<String, Object> item = cartItems.get(i);
                if (i > 0) jsonResult.append(",");
                jsonResult.append("{");
                jsonResult.append("\"cart_id\":").append(item.get("cart_id")).append(",");
                jsonResult.append("\"product_id\":").append(item.get("product_id")).append(",");
                jsonResult.append("\"name\":\"").append(item.get("name")).append("\",");
                jsonResult.append("\"price\":").append(item.get("price")).append(",");
                jsonResult.append("\"quantity\":").append(item.get("quantity")).append(",");
                jsonResult.append("\"total\":").append(item.get("total"));
                jsonResult.append("}");
            }
            jsonResult.append("], \"total_amount\":").append(totalAmount);
            jsonResult.append(", \"item_count\":").append(cartItems.size()).append("}");
            out.println(jsonResult.toString());
            
        } catch (Exception e) {
            e.printStackTrace();
            out.println("{\"success\": false, \"message\": \"Error: " + e.getMessage() + "\"}");
        }
    }
    
    private void addToCart(HttpServletRequest request, HttpServletResponse response, 
                          int userId, PrintWriter out) throws Exception {
        
        int productId = Integer.parseInt(request.getParameter("product_id"));
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        
        try (Connection conn = getConnection()) {
            // Check if product exists and get details
            String productSql = "SELECT name, price, stock_quantity FROM products WHERE id = ?";
            PreparedStatement productStmt = conn.prepareStatement(productSql);
            productStmt.setInt(1, productId);
            ResultSet productRs = productStmt.executeQuery();
            
            if (!productRs.next()) {
                out.println("{\"success\": false, \"message\": \"Product not found\"}");
                return;
            }
            
            String productName = productRs.getString("name");
            double price = productRs.getDouble("price");
            int stockQuantity = productRs.getInt("stock_quantity");
            
            if (quantity > stockQuantity) {
                out.println("{\"success\": false, \"message\": \"Insufficient stock\"}");
                return;
            }
            
            // Check if item already in cart
            String checkSql = "SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkSql);
            checkStmt.setInt(1, userId);
            checkStmt.setInt(2, productId);
            ResultSet checkRs = checkStmt.executeQuery();
            
            if (checkRs.next()) {
                // Update existing cart item
                int newQuantity = checkRs.getInt("quantity") + quantity;
                String updateSql = "UPDATE cart SET quantity = ?, updated_at = NOW() WHERE id = ?";
                PreparedStatement updateStmt = conn.prepareStatement(updateSql);
                updateStmt.setInt(1, newQuantity);
                updateStmt.setInt(2, checkRs.getInt("id"));
                updateStmt.executeUpdate();
            } else {
                // Add new cart item
                String insertSql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
                PreparedStatement insertStmt = conn.prepareStatement(insertSql);
                insertStmt.setInt(1, userId);
                insertStmt.setInt(2, productId);
                insertStmt.setInt(3, quantity);
                insertStmt.executeUpdate();
            }
            
            out.println("{\"success\": true, \"message\": \"" + productName + " added to cart\"}");
        }
    }
    
    private void updateCartItem(HttpServletRequest request, HttpServletResponse response, 
                               int userId, PrintWriter out) throws Exception {
        
        int cartId = Integer.parseInt(request.getParameter("cart_id"));
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        
        try (Connection conn = getConnection()) {
            String sql = "UPDATE cart SET quantity = ?, updated_at = NOW() WHERE id = ? AND user_id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, quantity);
            pstmt.setInt(2, cartId);
            pstmt.setInt(3, userId);
            
            int rows = pstmt.executeUpdate();
            if (rows > 0) {
                out.println("{\"success\": true, \"message\": \"Cart updated\"}");
            } else {
                out.println("{\"success\": false, \"message\": \"Cart item not found\"}");
            }
        }
    }
    
    private void removeFromCart(HttpServletRequest request, HttpServletResponse response, 
                               int userId, PrintWriter out) throws Exception {
        
        int cartId = Integer.parseInt(request.getParameter("cart_id"));
        
        try (Connection conn = getConnection()) {
            String sql = "DELETE FROM cart WHERE id = ? AND user_id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, cartId);
            pstmt.setInt(2, userId);
            
            int rows = pstmt.executeUpdate();
            if (rows > 0) {
                out.println("{\"success\": true, \"message\": \"Item removed from cart\"}");
            } else {
                out.println("{\"success\": false, \"message\": \"Cart item not found\"}");
            }
        }
    }
    
    private void clearCart(HttpServletRequest request, HttpServletResponse response, 
                          int userId, PrintWriter out) throws Exception {
        
        try (Connection conn = getConnection()) {
            String sql = "DELETE FROM cart WHERE user_id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userId);
            
            int rows = pstmt.executeUpdate();
            out.println("{\"success\": true, \"message\": \"Cart cleared (" + rows + " items removed)\"}");
        }
    }
}
