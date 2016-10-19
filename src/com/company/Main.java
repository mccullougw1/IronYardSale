package com.company;

import org.h2.tools.Server;
import spark.Spark;

import java.sql.*;
import java.util.ArrayList;

public class Main {
//    --------Product--------
//    Integer productId;
//    String name;
//    String category;
//    String description;
//    double price;
//    String dateAdded;
//    Integer originatorId;
// --------- User-------------
//    Integer id;
//    String username;
//    String password;

    public static void createTables(Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS users (id IDENTITY, username VARCHAR, password VARCHAR)");
        stmt.execute("CREATE TABLE IF NOT EXISTS products (product_id IDENTITY, name VARCHAR, category VARCHAR, description VARCHAR, price DOUBLE, date VARCHAR, originator_id INT)");
    }

    public static void createUser(Connection conn, String username, String password) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO users VALUES (NULL, ?, ?)");
        stmt.setString(1, username);
        stmt.setString(2, password);
        stmt.execute();
    }

    public static User checkUser(Connection conn, String username) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE name = ?");
        stmt.setString(1, username);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            int id = results.getInt("id");
            String password = results.getString("password");
            return new User(id, username, password);
        }
        return null;
    }
    public static ArrayList<Product> getAllProducts(Connection conn) throws SQLException {
        ArrayList<Product> products = new ArrayList<>();
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM products INNER JOIN ON users products.originator_id = users.id");
        ResultSet results = stmt.executeQuery();
        while (results.next()) {
            int id = results.getInt("products.product_id");
            String name = results.getString("products.name");
            String category = results.getString("products.category");
            String description = results.getString("products.description");
            double price = results.getDouble("products.price");
            String dateAdded = results.getString("products.date");
            Integer originator = results.getInt("products.originator_id");
            products.add(new Product(id, name, category, description, price, dateAdded, originator));

        }
        return products;

    }
    public static Product selectProduct(Connection conn) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM products WHERE product_id = ?");
        ResultSet results = stmt.executeQuery();
        while (results.next()) {
            int id = results.getInt("product_id");
            String name = results.getString("name");
            String category = results.getString("category");
            String description = results.getString("products.description");
            double price = results.getDouble("price");
            String dateAdded = results.getString("date");
            Integer originator = results.getInt("originator_id");
            Product product = new Product(id, name, category, description, price, dateAdded, originator);
            return product;
        }
        return null;
    }
    public static void main(String[] args) throws SQLException{
        Server.createWebServer().start();
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");
        createTables(conn);
        Spark.externalStaticFileLocation("public");
        Spark.init();






    }
}
