'use strict';

var test = require('../lib'),
    http = require('http');

var count = 0;

test('suite', {
    before: function (t) {
        t.plan(1);
        count++;
        t.equal(t.name, 'suite.before', 'named suite.before.');
    },
    after: function () {
        count--;
    }
}, function (t) {

    t.test('test', {
        before: function (t) {
            t.plan(1);
            count++;
            t.equal(t.name, 'test.before', 'named test.before.');
        },
        after: function () {
            count--;
        }
    }, function (t) {
        t.plan(1);
        t.equal(count, 2, 'called suite.before and test.before.');
    });

    t.test('check after', function (t) {
        t.plan(1);
        t.equal(count, 1, 'test.after was called.');
    });

});

test('check after', function (t) {
    t.plan(1);
    t.equal(count, 0, 'suite.after was called.');
});