/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;
