'use strict';

var test = require('../lib');

test('hooks', function (t) {
    var count = 0;

    t.before(function (t, next) {
        t.equal(count++, 0, 'before: count is 0.'); //Count's against suite's plan.
        next();
    });

    t.beforeEach(function (t, next) {
        t.equal(count++, 1, 'beforeEach: count is 1.'); //Counts against tests's plan.
        next();
    });

    t.after(function () {
        t.pass('called after'); //Doesn't count against plan.
    });

    t.afterEach(function () {
        count--;
        t.pass('called afterEach'); //Count's against suite's plan.
    });

    t.test('plan1', function (t) {
        t.plan(2); //beforeEach, and this test.
        t.equal(count, 2, 'called before and beforeEach.');
    });

    t.test('plan2', function (t) {
        t.plan(2); //beforeEach, and this test.
        t.equal(count, 2, 'called beforeEach.');
    });

});