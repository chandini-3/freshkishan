package com.ecommerce.models;

public class Product {
    private int id;
    private String name;
    private String description;
    private double price;
    private String imageUrl;
    private int farmerId;

    public Product(int id, String name, String description, double price, String imageUrl, int farmerId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.farmerId = farmerId;
    }

    // Getters and setters can be added if needed
}
