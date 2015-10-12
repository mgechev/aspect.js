(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var MethodMetadata = (function () {
        function MethodMetadata() {
        }
        return MethodMetadata;
    })();
    exports.MethodMetadata = MethodMetadata;
    var Metadata = (function () {
        function Metadata() {
            this.__advice_metadata__ = true;
        }
        return Metadata;
    })();
    exports.Metadata = Metadata;
});
