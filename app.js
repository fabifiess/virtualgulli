// Is MySQL on?

var express = require('express');
var http = require('http');
//var fs = require('fs');
var multer = require('multer');             // File Upload / Middleware zum Parsen von Multipart forms
// var db = require('./db.js');             // Datenbank
var app = express();


/*
 Statische externe Dateien liegen im Folder public
 */
app.use(express.static(__dirname + '/public'));    // Zugriff auf den public Folder funktioniert, aber Upload nicht

/*
 *File-Upload / multer konfigurieren, damit Files automatisch schon in den richtigen Ordner gespeichert werden.
 *Wenn du keine optionen angibst, also nur app.use(multer()); machst, dann werden Bider im Standard-Temp-Ordner des Betriebssystems gespeichert und damit beim nächsten Neustart autoamtisch gelöscht.
 */
app.use(multer(
    {
        dest: './public/img/',
        rename: function (fieldname, filename) {
            return filename + Date.now();
        }
    }));


/* AB HIER KOMMEN DIE ROUTEN, DIE DER SERVER IMPLEMENTIERT */

/*
 Lege eine index.html auf den Server

 Die index.html wird ja oben schon über static freigegeben,
 deshalb lassen wir den Browser hier einfach nur einen redirect auf die index.html machen.
 Man kann die index.html auch einfach so erreichen: http://localhost:3000/html/index.html
 */
app.get('/', function (req, res) {
    res.redirect('/html/index.html');
});

app.post('/upload', function (req, res) {
    console.log(JSON.stringify(req.files)); //hier sollte jetzt dein upload unter datei auftauchen
    console.log(JSON.stringify(req.files.datei)); // hier wird das file direkt angesprochen
    res.redirect('/'); // wenn du willst, dass einfach wieder index.html geladen wird, dann sollte das hier reichen, weil du damit einfach an deine / route redirectest und die da drin dann auf index.html redirected wird
});


/*
 Server auf den TCP-Port 3000 legen
 */
var server = app.listen(3000, function () {
    console.log('listening on port 3000');
});