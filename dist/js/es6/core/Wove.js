/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;
