var stockRepository = require('./stockRepository');
var auth = require('./auth');
var app = require('./app')(stockRepository, auth('admin', 'admin'));

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});