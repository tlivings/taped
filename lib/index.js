'use strict';

var tape = require('tape');

exports = module.exports = function () {
    var args = Array.prototype.slice.call(arguments);

    for (var i = 0; i < args.length; i++) {
        switch (typeof args[i]) {
            case 'function':
                args[i] = instrument(args[i]);
                break;
            default:
                break;
        }
    }

    tape.apply(tape, args);
};

function instrument(fn) {

    return function (t) {

        t.before = function (fn) {
            var test = t.test;

            t.test = function () {
                var args = arguments;

                if (fn) {
                    fn(t, function () {
                        test.apply(t, args);
                        t.test = test;
                    });
                    //Only do it once.
                    fn = null;
                }
                else {
                    test.apply(t, args);
                    t.test = test;
                }
            };
        };

        t.beforeEach = function (fn) {

            t.on('test', function (t) {

                t.once('prerun', function () {
                    var callback = t._cb;

                    t._cb = function () {
                        var args = arguments;
                    
                        fn(t, function () {
                            callback.apply(t, args);
                            t._cb = callback;
                        });
                    };
                });
            });
        };

        t.after = function (fn) {
            t.once('end', fn);
        };

        t.afterEach = function (fn) {
            
            t.on('test', function (t) {
                t.once('end', fn);
            });
        };

        fn(t);
    }
}