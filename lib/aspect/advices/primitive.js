/// <reference path="../../typing/tsd.d.ts"/>
var util_1 = require('../../util/util');
var Aspect_1 = require('../../core/Aspect');
var meld = require('meld');
function registerAspect(a) {
    return Aspect_1.aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
}
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var invocation = { proceed: true, result: undefined };
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this,
            __aop_metadata__: true
        };
        var args = arguments;
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        self.exec.bind(self.context, params).apply(null, args);
        if (invocation.proceed && !bak.__advice__) {
            return bak.apply(this, args);
        }
        else if (bak.__advice__) {
            return bak.bind(this, params).apply(null, args);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var args = arguments;
        var params = {
            name: p,
            className: className,
            context: this,
            result: undefined,
            __aop_metadata__: true
        };
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        var result = bak.apply(this, arguments);
        params.result = result;
        return self.exec.bind(this, params).apply(null, args) || result;
    };
    return o;
});
exports.after = after;
var around = registerAspect('around');
exports.around = around;
var on = registerAspect('on');
exports.on = on;
var afterReturning = registerAspect('afterReturning');
exports.afterReturning = afterReturning;
var afterThrowing = registerAspect('afterThrowing');
exports.afterThrowing = afterThrowing;
