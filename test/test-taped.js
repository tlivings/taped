'use strict';

var test = require('../lib'),
    http = require('http');

var count = 0;
var afterCalled = false;

test('test', {
    before: function (t) {
        count++;
        t.plan(1);
        t.equal(t.name, 'test.before', 'named test.before.');
    },
    after: function () {
        afterCalled = true;
    }
}, function (t) {

    t.test('plan1', {
        before: function (t) {
            count++;
            t.plan(1);
            t.equal(t.name, 'plan1.before', 'named plan1.before.');
        },
        after: function () {
            count = 0;
        }
    }, function (t) {
        t.plan(1);
        t.equal(count, 2, 'called before and plan1.before.');
    });

    t.test('plan2', function (t) {
        t.plan(2);
        t.equal(count, 0, 'plan1.after was called.');
        t.pass('ran without hooks.');
    });

});

test('check after', function (t) {
    t.plan(1);
    t.ok(afterCalled, 'test.after was called.');
});