package com.company;

import jodd.json.JsonParser;
import jodd.json.JsonSerializer;
import org.h2.tools.Server;
import spark.Session;
import spark.Spark;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.Iterator;

public class Main {
//    ********Classes*********
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

    public static User getUser(Connection conn, String username) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE username = ?");
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
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM products"); //INNER JOIN ON users products.originator_id = users.id
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
    public static void deleteProduct(Connection conn, int productId) throws SQLException{
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM products WHERE id = ?");
        stmt.setInt(1, productId);
        stmt.execute();
    }
    public static void addProduct(Connection conn, Product product, int originatorId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO products VALUES (NULL, ?, ?, ?, ?, ?, ?)");
        stmt.setString(1, product.name);
        stmt.setString(2, product.category);
        stmt.setString(3, product.description);
        stmt.setDouble(4, product.price);
        stmt.setString(5, product.dateAdded);
        stmt.setInt(6, product.originatorId);
        stmt.execute();
    }
    public static void loadDummyData(Connection conn) throws SQLException, IOException {

        File f = new File("dummy_data_json");
        FileReader fr = new FileReader(f);
        int fileSize = (int) f.length();     //cast to int
        char[] contents = new char[fileSize];
        fr.read(contents, 0, fileSize);
        JsonParser parser = new JsonParser();
        ProductWrapper productWrapper = parser.parse(contents, ProductWrapper.class);
        for (int i = productWrapper.products.size() -1 ; i >= 0; i--) {
            Product p = productWrapper.products.get(i);
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO products VALUES (NULL, ?, ?, ?, ?, ?, ?)");
            stmt.setString(1, p.name);
            stmt.setString(2, p.category);
            stmt.setString(3, p.description);
            stmt.setDouble(4, p.price);
            stmt.setString(5, p.dateAdded);
            stmt.setInt(6, p.originatorId);
            stmt.execute();
        }


    }
    public static void main(String[] args) throws SQLException, IOException {
        Server.createWebServer().start();
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");
        createTables(conn);

        PreparedStatement stmt = conn.prepareStatement("SELECT COUNT(*) FROM products");
        ResultSet rowCount = stmt.executeQuery();
        int count = 0;
        while (rowCount.next()){
            ++count;
        }
        if (count == 1){
            loadDummyData(conn);
        }
        Spark.externalStaticFileLocation("public");
        Spark.init();

        Spark.post(
                "/login",
                (request, response) -> {
                    String body = request.body();
                    JsonParser parser = new JsonParser();
                    User user = parser.parse(body, User.class);
                    User userDatabase = getUser(conn, user.username);
                    if (userDatabase == null) {
                        createUser(conn, user.username, user.password);
                    } else if (!user.password.equals(userDatabase.password)) {
                        Spark.halt(403);
                        return "";
                    }
                    Session session = request.session();
                    session.attribute("username", user.username);
                    return "";
                }

        );
        Spark.get(
                "/get-products",
                (request, response) -> {
                    ArrayList<Product> products = getAllProducts(conn);
                    JsonSerializer s = new JsonSerializer();
                    return s.serialize(products);

                }
        );
        Spark.post(
                "/add-product",
                (request, response) -> {
                    Session session = request.session();
                    String username = session.attribute("username");
                    User user = getUser(conn, username);
                    String body = request.body();
                    JsonParser parser = new JsonParser();
                    Product product = parser.parse(body, Product.class);
                    addProduct(conn, product, user.id);
                    return "";
                }
        );
        Spark.get(
                "/get-user",
                (request, response) -> {
                    Session session = request.session();
                    String username = session.attribute("username");
                    if (username != null) {
                        User user = getUser(conn, username);
                        JsonSerializer serializer = new JsonSerializer();
                        return serializer.serialize(user);
                    }
                    return "";
                }
        );

    }
}
