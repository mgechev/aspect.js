(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    exports.AspectRegistry = {};
    function resetRegistry() {
        exports.AspectRegistry = {};
    }
    exports.resetRegistry = resetRegistry;
    var Aspect = (function () {
        function Aspect() {
            this.pointcuts = [];
        }
        Aspect.prototype.wove = function (target) {
            this.pointcuts.forEach(function (p) {
                p.apply(target);
            });
        };
        return Aspect;
    })();
    exports.Aspect = Aspect;
});
