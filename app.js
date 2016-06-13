var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

app.post('/stock', function(req, res) {
    res.json({isbn: req.body.isbn, count: req.body.count})
});

app.use(clientError);
app.use(serverError);

module.exports = app;