(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './aspect'], function (require, exports) {
    var aspect_1 = require('./aspect');
    function Wove() {
        return function (target) {
            var keys = Object.getOwnPropertyNames(aspect_1.AspectRegistry);
            keys.forEach(function (key) {
                aspect_1.AspectRegistry[key].wove(target);
            });
        };
    }
    exports.Wove = Wove;
});
