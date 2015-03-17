var fs = require('fs');
var mysql = require('mysql');             // Datenbank

/*
 MySQL: Database Connection
 */

var HOST = 'localhost';
var PORT = 8889; 											// Standard: 3306, bei MAMP: 8889
var MYSQL_USERNAME = 'root';								// Standard: root
var MYSQL_PASSWORD = 'root';     							// Standard: root

var db = mysql.createConnection(
    {
        host: HOST,
        port: PORT,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
    });
db.connect();


/*
 MySQL-Operationen
 */


// destroy old db
db.query('DROP DATABASE IF EXISTS dropdown_test', function (err) {
    if (!err) console.log("Old database dropped");
    if (err) console.log("Probably no connection to database");
});

// create database
db.query('CREATE DATABASE IF NOT EXISTS dropdown_test', function (err) {
    if (!err) console.log("New database created");
    if (err) console.log("Could not create a new database");
});

// Use this database
db.query('USE dropdown_test');

// create table
var query_createTable =
        "create table IF NOT EXISTS sweets(" +
        "   id int unsigned not null auto_increment," +          // Spalte 1
        "   name varchar(50) not null," +                       // Spalte 2
        "   examples varchar(50)," +
        "   img varchar(50)," +
        "   primary key (id)" +   						  	    // Der Primärschlüssel liegt in Spalte 1
        ");";
db.query(query_createTable, function (err) {
    if (!err) console.log("New table created");
    if (err) console.log("Could not create a new table");
});

// Fill table
db.query("insert into sweets (name, examples, img) values ('Bubble Gum', 'Hubba Bubba, Wrigleys, Orbit', 'bubble_gum.jpg');");
db.query("insert into sweets (name, examples, img) values ('Chocolate', 'Milka, Ritter Sport, Lindt', 'chocolate.jpg');");


// Read data
db.query("select * from sweets", function (err, rows, fields) {
    if (!err) {
        // Save data as JSON, client will pick the data from this JSON file (d3 benötigt JSON für Datengrafiken)
        // See also
        // http://stackoverflow.com/questions/20532820/node-js-mysql-json-result-callback-issue-no-response-to-client

        var json = JSON.stringify(rows);
        console.log('JSON-result:', json);

        var outputFilename = './public/json/sweets.json';
        fs.writeFile(outputFilename, json, function (err) {
            if (!err) console.log("JSON saved to " + outputFilename);
            if (err) console.log("JSON could not be saved to " + outputFilename);
        });
    }
});

db.end();
