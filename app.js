var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/bookinventory';

function logRequest(req, res, next) {
    console.log('incoming request logged at ', new Date());
    next();
}

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({message: err.message, error: (process.env.NODE_ENV === 'production') ? {} : err.stack});
}

app.use(bodyParser.json());
app.use(logRequest);

app.get('/', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        console.log("Connected succesfully to server");
        db.collection('books').updateOne({isbn: req.body.isbn}, {
            isbn: req.body.isbn,
            count: req.body.count
        }, {upsert: true});
        db.close();
    });
    res.send('Hello World!');
});

app.post('/stock', function (req, res) {
    res.json({isbn: req.body.isbn, count: req.body.count})
});

app.use(clientError);
app.use(serverError);

module.exports = app;