(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var Pointcut = (function () {
        function Pointcut() {
        }
        Pointcut.prototype.apply = function (fn) {
            var _this = this;
            this.jointPoints.forEach(function (jp) {
                var matches = jp.match(fn);
                jp.wove({ fn: fn, matches: matches }, _this.advice);
            });
        };
        return Pointcut;
    })();
    exports.Pointcut = Pointcut;
});
