package com.company;

import jodd.json.JsonSerializer;
import jodd.json.meta.JSON;
import org.junit.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

import static org.junit.Assert.*;

/**
 * Created by john.tumminelli on 10/19/16.
 */
public class MainTest {
    public Connection startConnection() throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:h2:mem:test");
        Main.createTables(conn);
        return conn;
    }

    @Test
    public void testCreateUser() throws SQLException {
        Connection conn = startConnection();
        Main.createUser(conn, "testuser", "testuser123");
        User user = Main.getUser(conn, "testuser");
        conn.close();
        assertTrue(user != null);
    }
    @Test
    public void testGetUser() throws SQLException {
        Connection conn = startConnection();
        Main.createUser(conn, "Huey", "huey123");
        User user = Main.getUser(conn, "Huey");
        Main.getUser(conn, "Huey");
        conn.close();
        assertTrue(user != null);
        assertTrue(user.username.equals("Huey"));
        assertTrue(user.password.equals("huey123"));
        assertTrue(user.id == 1);
    }
    @Test
    public void testSerializeProduct() throws SQLException, IOException {
        Connection conn = startConnection();
        User user = new User(1, "Huey", "huey123");
        Product testProduct = new Product(1, "Test Widget", "Widgets", "beautiful widget designed for the whole family's enjoyment. batteries not included", 2995.99, "2016-10-19", 3);
        Product testProduct2 = new Product(2, "test2", "assorted stuff", "nothing much to say here", 3400.00, "2016-12-01", 2);
        ArrayList<Product> testProducts = new ArrayList<>();
        testProducts.add(testProduct);
        testProducts.add(testProduct2);
        JsonSerializer s = new JsonSerializer();
        File testFile = new File("test_json.txt");
        FileWriter fw = new FileWriter(testFile);
        fw.write(s.serialize(testProducts));
        fw.close();
        conn.close();
    }



}