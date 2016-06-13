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
    res.send('Hello World!');
});

var collection;
MongoClient.connect(url, function (err, db) {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    else {
        console.log("Connected succesfully to server");
        collection = db.collection('books');
    }
});


app.post('/stock', function (req, res) {
    collection.updateOne({isbn: req.body.isbn}, {
        isbn: req.body.isbn,
        count: req.body.count
    }, {upsert: true});
    res.json({isbn: req.body.isbn, count: req.body.count});
});

app.get('/stock', function (req, res) {
    collection.find({}).toArray(function (err, results) {
        res.json(results);
    });
});

app.use(clientError);
app.use(serverError);

module.exports = app;