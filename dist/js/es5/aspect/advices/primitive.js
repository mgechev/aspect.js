/// <reference path="../../typing/tsd.d.ts"/>
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
var before = registerAspect('before');
exports.before = before;
var around = registerAspect('around');
exports.around = around;
var on = registerAspect('on');
exports.on = on;
var after = registerAspect('after');
exports.after = after;
var afterReturning = registerAspect('afterReturning');
exports.afterReturning = afterReturning;
var afterThrowing = registerAspect('afterThrowing');
exports.afterThrowing = afterThrowing;
