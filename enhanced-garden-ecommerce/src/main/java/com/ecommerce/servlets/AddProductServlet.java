package com.ecommerce.servlets;

import com.ecommerce.database.DatabaseConnection;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet("/add-product")
public class AddProductServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null || !"farmer".equals(session.getAttribute("userRole"))) {
            // If user is not a farmer or not logged in, redirect to login
            response.sendRedirect("login.html");
            return;
        }

        String name = request.getParameter("name");
        String description = request.getParameter("description");
        double price = Double.parseDouble(request.getParameter("price"));
        String imageUrl = request.getParameter("image_url");
        int farmerId = (int) session.getAttribute("userId");

        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            conn = DatabaseConnection.getConnection();
            String sql = "INSERT INTO products (name, description, price, image_url, farmer_id) VALUES (?, ?, ?, ?, ?)";
            stmt = conn.prepareStatement(sql);

            stmt.setString(1, name);
            stmt.setString(2, description);
            stmt.setDouble(3, price);
            stmt.setString(4, imageUrl);
            stmt.setInt(5, farmerId);

            int rowsAffected = stmt.executeUpdate();

            if (rowsAffected > 0) {
                // Product added successfully, redirect to a success page or farmer dashboard
                response.sendRedirect("index.html"); // Or a farmer dashboard
            } else {
                // Failed to add product
                response.getWriter().println("Failed to add product. Please try again.");
            }

        } catch (SQLException e) {
            throw new ServletException("Database error when adding product", e);
        } finally {
            try {
                if (stmt != null) stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
