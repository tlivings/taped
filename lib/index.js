'use strict';

var tape = require('tape'),
    Test = tape.Test;

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

    if (typeof opts.before === 'function') {
        t.test(t.name + '.before', function (t_) {
            opts.before(t_);
        });
    }
    if (typeof opts.after === 'function') {
        t.once('end', opts.after.bind(t, t));
    }

    test = t.test;

    t.test = function () {
        var opts, args, name;

        args = Array.prototype.slice.call(arguments);

        for (var i = 0; i < args.length; i++) {
            switch (typeof args[i]) {
                case 'object':
                    opts = args[i];
                    break;
                case 'function':
                    if (opts) {
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
                    }
                    break;
                default:
                    break;
            }
        }

        test.apply(t, args);
    };
}