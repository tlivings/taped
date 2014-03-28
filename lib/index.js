'use strict';

var tape = require('tape');

exports = module.exports = function () {
    var args = Array.prototype.slice.call(arguments);

    var test = tape.apply(tape, args);

    for (var i = 0; i < args.length; i++) {
        switch (typeof args[i]) {
            case 'object':
                args[i] = wrap(test, args[i]);
                break;
            default:
                break;
        }
    }

    return test;
};

function wrap(t, opts) {
    var test;

    if (typeof opts.before === 'function') {
        t.once('prerun', function () {
            t.test(t.name + '.before', function (t) {
                opts.before(t);
            });
        });
    }
    if (typeof opts.after === 'function') {
        t.once('end', function () {
            opts.after();
        });
    }

    test = t.test;

    t.test = function () {
        var opts, args, name;

        args = Array.prototype.slice.call(arguments);

        for (var i = 0; i < args.length; i++) {
            switch (typeof args[i]) {
                case 'object':
                    opts = args[i];
                    if (opts.before) {
                        name = typeof args[0] === 'string' ? args[0] + '.before' : '(anonymous).before';
                        t.test(name, function (t) {
                            if (opts.after) {
                                t.once('end', function () {
                                    opts.after();
                                });
                            }
                            opts.before(t);
                        });
                    }
                    break;
                default:
                    break;
            }
        }

        test.apply(t, args);
    };
}
