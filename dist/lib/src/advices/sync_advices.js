var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", '../core/advice'], function (require, exports) {
    var advice_1 = require('../core/advice');
    var BeforeAdvice = (function (_super) {
        __extends(BeforeAdvice, _super);
        function BeforeAdvice() {
            _super.apply(this, arguments);
        }
        BeforeAdvice.prototype.wove = function (target, metadata) {
            this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
            this.invoke(target, metadata);
            return metadata.method.result;
        };
        return BeforeAdvice;
    })(advice_1.Advice);
    exports.BeforeAdvice = BeforeAdvice;
    var AfterAdvice = (function (_super) {
        __extends(AfterAdvice, _super);
        function AfterAdvice() {
            _super.apply(this, arguments);
        }
        AfterAdvice.prototype.wove = function (target, metadata) {
            this.invoke(target, metadata);
            this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
            return metadata.method.result;
        };
        return AfterAdvice;
    })(advice_1.Advice);
    exports.AfterAdvice = AfterAdvice;
    var AroundAdvice = (function (_super) {
        __extends(AroundAdvice, _super);
        function AroundAdvice() {
            _super.apply(this, arguments);
        }
        AroundAdvice.prototype.wove = function (target, metadata) {
            this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
            this.invoke(target, metadata);
            this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
            return metadata.method.result;
        };
        return AroundAdvice;
    })(advice_1.Advice);
    exports.AroundAdvice = AroundAdvice;
    var OnThrowAdvice = (function (_super) {
        __extends(OnThrowAdvice, _super);
        function OnThrowAdvice() {
            _super.apply(this, arguments);
        }
        OnThrowAdvice.prototype.wove = function (target, metadata) {
            try {
                this.invoke(target, metadata);
            }
            catch (e) {
                this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
            }
            return metadata.method.result;
        };
        return OnThrowAdvice;
    })(advice_1.Advice);
    exports.OnThrowAdvice = OnThrowAdvice;
});
