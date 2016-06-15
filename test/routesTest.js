var assert = require('assert');
var routesFactory = require('../routes');

describe('Route', function () {


    it('stock up should return current stock state on successful request', function (done) {
        var stockRepository = {
            stockUp: function (isbn, count) {
                assert.equal(isbn, '123456789');
                assert.equal(count, 10);
                return Promise.resolve();
            }
        };
        var routes = routesFactory(stockRepository);

        var req = {
            body: {
                isbn: '123456789',
                count: 10
            }
        };
        var res = {
            json: function (body) {
                assert.deepEqual(body, req.body);
                done();
            }
        };

        routes.stockUp(req, res);
    });

 

});