[![Build Status](https://travis-ci.org/tlivings/taped.png)](https://travis-ci.org/tlivings/taped) [![NPM version](https://badge.fury.io/js/taped.png)](http://badge.fury.io/js/taped)

# Taped

Adds easy to use life-cycle functions for [tape](https://github.com/substack/tape) tests.

### Usage

Add `before` and `after` options to either `test` or `t.test`.

A `before` test will complete when the test passed to it completes (either through `t.end` or when the `plan` completes.

Example:

```javascript
var test = require('taped');

test('taped', {
    before: function (t) {
        //Call t.end directly.
        t.end();
    },
    after: function () {
        //Cleanup
    }
}, function (t) {

    t.test('test', {
       before: function (t) {
           //Using plan.
           t.plan(1);
           t.pass('before called.');
       },
       after: function () {
           //Cleanup
       }
   }, function (t) {
        t.pass('everything ran.');
        t.end();
    });
});
```
