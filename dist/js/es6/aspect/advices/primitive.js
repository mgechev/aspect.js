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
var before = Aspect_1.aspectFactory('before', function () {
    return function (bak, self, metadata) {
        self.exec.bind(self.context, metadata).apply(null, metadata.method.args);
        if (bak.__advice__) {
            return bak.bind(self.context, metadata).apply(null, metadata.method.args);
        }
        else if (!bak.__advice__) {
            if (metadata.method.proceed) {
                return bak.apply(metadata.method.context, metadata.method.args);
            }
            else {
                return metadata.method.result;
            }
        }
    };
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function () {
    return function (bak, self, metadata) {
        var result = undefined;
        if (bak.__advice__) {
            result = bak.bind(self.context, metadata).apply(null, metadata.method.args);
        }
        else {
            result = bak.apply(metadata.method.context, metadata.method.args);
        }
        return self.exec.bind(self.context, metadata).apply(null, metadata.method.args) || result;
    };
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
