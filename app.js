var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./middleware');

module.exports = function(stockRepository) {
    var app = express();
    var routes = require('./routes')(stockRepository);

    app.use(bodyParser.json());
    app.use(middleware.logRequest);

    app.get('/', routes.hello);
    app.post('/stock', routes.stockUp);
    app.get('/stock', routes.findAll);
    app.get('/stock/:isbn', routes.getCount);

    app.use(middleware.clientError);
    app.use(middleware.serverError);

    return app;
};