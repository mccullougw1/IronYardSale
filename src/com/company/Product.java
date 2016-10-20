package com.company;

/**
 * Created by john.tumminelli on 10/19/16.
 */
public class Product {
    Integer productId;
    String name;
    String category;
    String description;
    double price;
    String dateAdded;
    Integer originatorId;

    public Product(Integer productId, String name, String category, String description, double price, String dateAdded, Integer originatorId) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.dateAdded = dateAdded;
        this.originatorId = originatorId;
    }

    public Product() {
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(String dateAdded) {
        this.dateAdded = dateAdded;
    }

    public Integer getOriginatorId() {
        return originatorId;
    }

    public void setOriginatorId(Integer originatorId) {
        this.originatorId = originatorId;
    }
}
