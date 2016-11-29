package com.company;

import java.util.ArrayList;

/**
 * Created by john.tumminelli on 10/20/16.
 */
public class ProductWrapper {
    ArrayList<Product> products;

    public ProductWrapper() {
    }

    public ProductWrapper(ArrayList<Product> products) {
        this.products = products;
    }

    public ArrayList<Product> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<Product> products) {
        this.products = products;
    }
}
