var tape = require('tape');
var S = require('./').QAS;

tape('qas', function (test) {
    test.plan(4);
    test.equal(typeof S, 'function');
    var a, b, c;
    S(function (e) {
        test.equal(a, e);
    }, 1);
    a = 1;
    b = 2;
    S(function (e) {
        test.equal(b, e);
    }, 2).ready();
    c = 3;
    S(function (e) {
        test.equal(c, e);
    }, 3);
})
