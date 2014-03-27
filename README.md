[![Build Status](https://travis-ci.org/tlivings/taped.png)](https://travis-ci.org/tlivings/taped) [![NPM version](https://badge.fury.io/js/taped.png)](http://badge.fury.io/js/taped)

# Taped

Adds easy to use life-cycle functions for [tape](https://github.com/substack/tape) tests.

### Usage

```javascript
var test = require('taped');

test('taped', {
    before: function (t, next) {
        //t is 'taped' test.
        next();
    },
    after: function (t) {
        //t is 'taped' test.
    }
}, function (t) {

    t.test('test', {
       before: function (t, next) {
           //t is 'test' test.
           next();
       },
       after: function (t) {
           //t is 'test' test.
       }
   }, function (t) {
        t.pass('everything ran.');
        t.end();
    });
});
```