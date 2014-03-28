[![Build Status](https://travis-ci.org/tlivings/taped.png)](https://travis-ci.org/tlivings/taped) [![NPM version](https://badge.fury.io/js/taped.png)](http://badge.fury.io/js/taped)

# Taped

Adds easy to use life-cycle functions for [tape](https://github.com/substack/tape) tests.

### Usage

```javascript
var test = require('taped');

test('taped', {
    before: function (t) {
        t.end();
    },
    after: function (t) {
        //Cleanup
    }
}, function (t) {

    t.test('test', {
       before: function (t) {
           t.end();
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