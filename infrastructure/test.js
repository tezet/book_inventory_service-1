var base = require('./base');
var _ = require('lodash');

var test = {
    name: 'book-inventory-us-test'
};

base.configurator(_.merge({}, base.config, test));

