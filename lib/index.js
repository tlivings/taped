'use strict';

var tape = require('tape');

exports = module.exports = function () {
    var test, options;

    test = tape.apply(tape, arguments);

    options = filter(arguments, 'object');

    if (options && options.length) {
        instrument(test, options[0]);
    }

    return test;
};

function instrument(t, options) {
    var test;

    if (typeof options.before === 'function') {
        t.once('prerun', function () {
            t.test(t.name + '.before', function (t) {
                options.before(t);
            });
        });
    }
    if (typeof options.after === 'function') {
        t.once('end', function () {
            options.after();
        });
    }

    test = t.test;

    t.test = function () {
        var options, args, name;

        args = slice(arguments);
        options = filter(arguments, 'object');

        if (options && options.length) {
            options = options[0];

            if (options.before) {
                name = typeof args[0] === 'string' ? args[0] + '.before' : '(anonymous).before';
                t.test(name, function (t) {
                    if (options.after) {
                        t.once('end', function () {
                            options.after();
                        });
                    }
                    options.before(t);
                });
            }
        }

        test.apply(t, args);
    };
}

function filter(argv, type) {
    return slice(argv).filter(function (arg) {
        return typeof arg === type;
    });
}

function slice(argv) {
    return Array.prototype.slice.call(argv);
}