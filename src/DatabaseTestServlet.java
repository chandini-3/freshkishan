package src;

import java.io.*;
import java.sql.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/DatabaseTestServlet")
public class DatabaseTestServlet extends HttpServlet {
    
    private static final String DB_URL = "jdbc:mysql://localhost:3306/farmer_marketplace";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Database Test</title>");
        out.println("<style>body{font-family:Arial;padding:20px;} .success{color:green;} .error{color:red;}</style>");
        out.println("</head><body>");
        out.println("<h1>🔧 Database Connection Test</h1>");
        
        try {
            // Test database connection
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            
            out.println("<div class='success'>✅ Database connection successful!</div>");
            
            // Test users table
            PreparedStatement stmt = conn.prepareStatement("SELECT COUNT(*) as count FROM users");
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int userCount = rs.getInt("count");
                out.println("<div class='success'>✅ Users table accessible. Found " + userCount + " users.</div>");
            }
            rs.close();
            stmt.close();
            
            // Test products table
            stmt = conn.prepareStatement("SELECT COUNT(*) as count FROM products");
            rs = stmt.executeQuery();
            if (rs.next()) {
                int productCount = rs.getInt("count");
                out.println("<div class='success'>✅ Products table accessible. Found " + productCount + " products.</div>");
            }
            rs.close();
            stmt.close();
            
            // Test cart table
            stmt = conn.prepareStatement("SELECT COUNT(*) as count FROM cart");
            rs = stmt.executeQuery();
            if (rs.next()) {
                int cartCount = rs.getInt("count");
                out.println("<div class='success'>✅ Cart table accessible. Found " + cartCount + " cart items.</div>");
            }
            rs.close();
            stmt.close();
            
            // Show sample users
            out.println("<h3>Sample Users:</h3>");
            stmt = conn.prepareStatement("SELECT id, username, full_name FROM users LIMIT 5");
            rs = stmt.executeQuery();
            out.println("<ul>");
            while (rs.next()) {
                out.println("<li>ID: " + rs.getInt("id") + ", Username: " + rs.getString("username") + 
                           ", Name: " + rs.getString("full_name") + "</li>");
            }
            out.println("</ul>");
            rs.close();
            stmt.close();
            
            conn.close();
            
        } catch (ClassNotFoundException e) {
            out.println("<div class='error'>❌ MySQL JDBC Driver not found: " + e.getMessage() + "</div>");
        } catch (SQLException e) {
            out.println("<div class='error'>❌ Database error: " + e.getMessage() + "</div>");
        } catch (Exception e) {
            out.println("<div class='error'>❌ General error: " + e.getMessage() + "</div>");
        }
        
        out.println("<br><a href='/gar/enhanced-garden-ecommerce/'>← Back to Main Site</a>");
        out.println("</body></html>");
    }
}
