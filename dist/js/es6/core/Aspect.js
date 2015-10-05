var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
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
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;
