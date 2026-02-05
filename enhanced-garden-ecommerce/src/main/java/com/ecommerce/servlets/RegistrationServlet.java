package com.ecommerce.servlets;

import com.ecommerce.database.DatabaseConnection;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet("/register")
public class RegistrationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Retrieve form parameters
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String password = request.getParameter("password"); // In a real app, hash this!
        String role = request.getParameter("role");
        String address = request.getParameter("address");

        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            conn = DatabaseConnection.getConnection();
            String sql = "INSERT INTO users (name, email, password, role, address) VALUES (?, ?, ?, ?, ?)";
            stmt = conn.prepareStatement(sql);

            stmt.setString(1, name);
            stmt.setString(2, email);
            stmt.setString(3, password);
            stmt.setString(4, role);

            if ("farmer".equals(role)) {
                stmt.setString(5, address);
            } else {
                stmt.setNull(5, java.sql.Types.VARCHAR);
            }

            int rowsAffected = stmt.executeUpdate();

            if (rowsAffected > 0) {
                // Registration successful, redirect to a success page or login page
                response.sendRedirect("success.html");
            } else {
                // Registration failed
                response.getWriter().println("Registration failed. Please try again.");
            }

        } catch (SQLException e) {
            // Handle potential duplicate email entry
            if (e.getSQLState().equals("23000")) { // SQLSTATE for integrity constraint violation
                 response.getWriter().println("Registration failed: An account with this email already exists.");
            } else {
                throw new ServletException("Database error during registration", e);
            }
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                // We don't close the connection here because it's managed by DatabaseConnection class
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
