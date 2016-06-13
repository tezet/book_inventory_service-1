var express = require('express');
var app = express();


var logIncoming = function (req, res, next) {
    console.log('new request at ' + new Date());
    next();
};

app.use(logIncoming);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});