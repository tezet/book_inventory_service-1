var base = require('./base');
var _ = require('lodash');

var prod = {
    name: 'book-inventory-us-prod'
};

base.configurator(_.merge({}, base.config, prod));

