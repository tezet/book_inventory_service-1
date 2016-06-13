var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var logIncoming = function (req, res, next) {
    console.log('new request at ' + new Date());
    next();
};

app.use(logIncoming);

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/stock', function(req, res) {
    res.json({isbn: req.body.isbn, count: req.body.count})
});

app.use(clientError);
app.use(serverError);

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send('Something broke!');
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});