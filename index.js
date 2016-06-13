var express = require('express');
var app = express();


var logIncoming = function (req, res, next) {
    console.log('new request at ' + new Date());
    next();
};

app.use(logIncoming);

app.get('/', function (req, res) {
    throw new Error('sth bad heppened');
    res.send('Hello World!');
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