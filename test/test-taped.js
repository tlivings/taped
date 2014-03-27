'use strict';

var test = require('../lib'),
    http = require('http');

var count = 0;

test('test', {
    before: function (t, next) {
        t.equal(count++, 0, 'before: count is 0.');
        next();
    },
    after: function (t) {
        t.pass('called after');
    }
}, function (t) {

    t.test('plan1', {
        before: function (t, next) {
            t.equal(count++, 1, 'beforeEach: count is 1.'); //Counts against tests's plan.
            next();
        },
        after: function () {
            count--;
            t.pass('called afterEach'); //Count's against suite's plan.
        }
    }, function (t) {
        t.plan(2); //beforeEach, and this test.
        t.equal(count, 2, 'called before and beforeEach.');
    });

});