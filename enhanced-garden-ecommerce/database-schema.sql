-- This script creates the necessary tables for the Enhanced Garden E-Commerce application.

-- Drop the table if it already exists to start fresh (optional, good for development)
DROP TABLE IF EXISTS users;

-- Create the 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- In a real application, this should store a hashed password
    role VARCHAR(50) NOT NULL, -- 'customer' or 'farmer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- You can add more tables here as the project grows, for example:
-- CREATE TABLE products ( ... );
-- CREATE TABLE orders ( ... );
