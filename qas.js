this.QAS = (function (win) {
    /* asynchronous function queuing script
     * http://stackoverflow.com/questions/6963779/whats-the-name-of-google-analytics-async-design-pattern-and-where-is-it-used
     * usage:
     * QAS(function (win, doc, body) {
     *   // do something with 3rd part libs
     * }, window, document, document.body);
     *
     * then in you 3rd part libs ending, add:
     * QAS.ready();
     */

    var setImmediate = win.requestAnimationFrame || win.setImmediate || function (fn) {
            return setTimeout(fn, 1);
        };
    //var clearImmediate = win.cancelAnimationFrame || win.clearImmediate || win.clearTimeout;

    var queue = [];
    var loaded;
    var slice = Array.prototype.slice;
    var QAS = function (cb) {
        var args = slice.call(arguments, 1);
        if (loaded) run(cb, args);
        else queue.push([cb, args]);
        return QAS;
    }
    QAS.ready = function () {
        loaded = true;
        var pair;
        while ((pair = queue.shift())) {
            run(pair[0], pair[1]);
        }
    }
    function run(cb, args) {
        if (typeof cb != 'function') return;
        var that = this;
        setImmediate(function () {
            cb.apply(that, args);
        });
    }
    return QAS;

}(this));
