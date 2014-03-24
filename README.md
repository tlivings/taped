# Taped

Adds easier life-cycle functions around tape tests.

### Usage

```javascript
var test = require('taped');

test('taped', function (t) {
    t.before(function (t, next) {
        //Do something
        next();
    });

    t.beforeEach(function (t, next) {
        //Do something
        next();
    });

    t.after(function () {
        //Do something
    });

    t.afterEach(function () {
        //Do something
    });

    t.test(function (t) {
        t.pass('everything ran.');
        t.end();
    });
});
```