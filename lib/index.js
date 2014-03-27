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
    var test, cb;

    cb = t._cb;

    if (typeof opts.before === 'function') {
        t._cb = function () {
            var args = arguments;

            opts.before(t, function () {
                cb.apply(t, args);
                t._cb = cb;
            });
        };
    }
    if (typeof opts.after === 'function') {
        t.once('end', opts.after.bind(t, t));
    }

    test = t.test;

    t.test = function () {
        var opts, args, cb;

        args = Array.prototype.slice.call(arguments);

        for (var i = 0; i < args.length; i++) {
            switch (typeof args[i]) {
                case 'object':
                    opts = args[i];
                    break;
                case 'function':
                    if (opts) {
                        cb = args[i];
                        args[i] = function (t_) {
                            var argv = arguments;

                            if (typeof opts.after === 'function') {
                                t_.once('end', opts.after.bind(t_, t_));
                            }
                            if (typeof opts.before === 'function') {
                                opts.before(t_, function () {
                                    cb.apply(t_, argv);
                                    args[i] = cb;
                                });
                                return;
                            }
                            cb.apply(t_, argv);
                            args[i] = cb;
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        test.apply(t, args);
    };
}