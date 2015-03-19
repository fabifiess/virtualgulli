// Is MySQL on?

var express = require('express');
var multer = require('multer');          // File Upload / Middleware zum Parsen von Multipart forms// Datenbank-Operationen
var fs = require('fs');

var app = express();
app.set('port', (process.env.PORT || 5000));

/*
 Statische externe Dateien liegen im Folder public
 */

app.use(express.static(__dirname + '/public'));

/*
Middleware zum Empfang von Formulardaten
*/

app.use(multer());


/*
Lege eine index.html auf den Server -> http://localhost:3000 oder http://localhost:3000/html/index.html
 */

app.get('/', function (req, res) {
    res.redirect('/html/index.html');
});



/*
 bestehende JSON-Datei lesen
  */

var datensaetze;

fs.readFile('./public/json/form.json', function (err, data) {
    if (err) throw err;
    //console.log(JSON.parse(data));       //  { key: 'value' }  <- JS-Objekt
    datensaetze = data;                        //  {"key":"value"} <- JSON-String
    console.log("file before submit: " + datensaetze);
});


/*
 Inhalte aus dem Formular holen und in einem JSON-File abspeichern
 */

app.post('/upload', function (req, res) {

    // erhalte Formulardaten als JSON-Objekt
    datensaetze += "," + JSON.stringify(req.body);
    //array.push(json);
    console.log("neuer Datensatz: " + datensaetze);                    //  {"key":"value"} <- JSON-String

    // JSON-Datei überschreiben
    var outputFilename = './public/json/form.json';
    fs.writeFile(outputFilename, datensaetze, function (err) {
        if (!err) console.log("JSON saved to " + outputFilename);
        if (err) console.log("JSON could not be saved to " + outputFilename);
    });

    //res.redirect('/');
    res.end("Danke fuer die Teilnahme! " + datensaetze);
});


/*
 Server auf den TCP-Port 3000 legen
 */

var server = app.listen(app.get('port') , function () {
    console.log('listening on port 5000');
});