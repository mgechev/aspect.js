var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var metadata_1 = require('../aspect/advices/metadata');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, function (o, p, className) {
                var bak = o[p];
                var self = this;
                o[p] = function () {
                    var invocation = {
                        name: p,
                        args: undefined,
                        proceed: true,
                        context: this,
                        result: undefined
                    };
                    var metadata = new metadata_1.Metadata();
                    metadata.method = invocation;
                    metadata.className = className;
                    if (arguments[0] && arguments[0].__advice_metadata__) {
                        var previousMetadata = arguments[0];
                        metadata.method.result = previousMetadata.method.result;
                        metadata.method.proceed = previousMetadata.method.proceed;
                        metadata.method.args = previousMetadata.method.args;
                        metadata.method.context = previousMetadata.method.context;
                    }
                    else {
                        metadata.method.args = Array.prototype.slice.call(arguments);
                    }
                    return apply().call(this, bak, self, metadata);
                };
                return o;
            }, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;
