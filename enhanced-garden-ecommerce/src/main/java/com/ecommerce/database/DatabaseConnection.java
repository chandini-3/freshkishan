package com.ecommerce.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    private static final String URL = "jdbc:mysql://localhost:3306/farmer_market";
    private static final String USER = "root";
    private static final String PASSWORD = "chnadini33";

    // Static block to load the driver once when the class is loaded into memory
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL JDBC Driver not found. Add it to your classpath.");
            throw new RuntimeException("Failed to load MySQL JDBC Driver", e);
        }
    }

    /**
     * Provides a new database connection.
     * The caller is responsible for closing the connection.
     * @return A new Connection object to the database.
     * @throws SQLException if a database access error occurs.
     */
    public static Connection getConnection() throws SQLException {
        // Always create a new connection for each request to ensure thread safety.
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
