package com.company;

import org.h2.tools.Server;
import spark.Spark;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Main {
//    Integer productId;
//    String name;
//    String category;
//    String Description;
//    double price;
//    String dateAdded;
//    Integer originatorId;

    public static void createTables(Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS users (id IDENTITY, username VARCHAR, password VARCHAR)");
        stmt.execute("CREATE TABLE IF NOT EXISTS products (product_id IDENTITY, name VARCHAR, category VARCHAR, description VARCHAR, price FLOAT, date VARCHAR, originator_id INT)");
    }

    public static void createUser() {

    }
    public static void checkUser() {

    }
    public static void getAllProducts() {

    }
    public static void selectProduct() {

    }
    public static void main(String[] args) throws SQLException{
        Server.createWebServer().start();
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");
        createTables(conn);
        Spark.externalStaticFileLocation("public");
        Spark.init();






    }
}
