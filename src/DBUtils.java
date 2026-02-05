import java.sql.*;

public class DBUtils {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/student"; // Adjust if necessary
    private static final String DB_USER = "root"; // Your MySQL username
    private static final String DB_PASSWORD = "chandini33"; // Your MySQL password

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
        } catch (ClassNotFoundException | SQLException e) {
            throw new SQLException("Database connection error: " + e.getMessage(), e);
        }
    }
}
