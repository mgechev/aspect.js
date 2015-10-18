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
})(["require", "exports", '../core/joint_point', '../core/pointcut', '../core/aspect', './preconditions'], function (require, exports) {
    var joint_point_1 = require('../core/joint_point');
    var pointcut_1 = require('../core/pointcut');
    var aspect_1 = require('../core/aspect');
    var preconditions_1 = require('./preconditions');
    var BLACK_LIST = [
        'constructor'
    ];
    var MethodCallJointPoint = (function (_super) {
        __extends(MethodCallJointPoint, _super);
        function MethodCallJointPoint() {
            _super.apply(this, arguments);
        }
        MethodCallJointPoint.prototype.getTarget = function (fn) {
            return fn.prototype;
        };
        MethodCallJointPoint.prototype.match = function (target) {
            var _this = this;
            var name = target.name;
            var keys = Object.getOwnPropertyNames(target.prototype);
            keys = keys.filter(function (key) {
                return BLACK_LIST.indexOf(key) < 0;
            });
            var res = keys.map(function (key) {
                var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
                if (_this.precondition.assert({ className: name, methodName: key }) &&
                    typeof descriptor.value === 'function') {
                    return key;
                }
                return false;
            }).filter(function (val) { return !!val; });
            return res;
        };
        MethodCallJointPoint.prototype.woveTarget = function (proto, key, advice) {
            var className = proto.constructor.name;
            var bak = proto[key];
            var self = this;
            proto[key] = function () {
                var metadata = self.getMetadata(className, key, arguments, this);
                return advice.wove(bak, metadata);
            };
            proto[key].__woven__ = true;
        };
        return MethodCallJointPoint;
    })(joint_point_1.JointPoint);
    exports.MethodCallJointPoint = MethodCallJointPoint;
    function makeMethodCallAdviceDecorator(constr) {
        return function () {
            var selectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selectors[_i - 0] = arguments[_i];
            }
            return function (target, prop, descriptor) {
                var jointpoints = selectors.map(function (selector) {
                    return new MethodCallJointPoint(new preconditions_1.MethodPrecondition(selector));
                });
                var pointcut = new pointcut_1.Pointcut();
                pointcut.advice = new constr(target, descriptor.value);
                pointcut.jointPoints = jointpoints;
                var aspectName = target.constructor.name;
                var aspect = aspect_1.AspectRegistry[aspectName] || new aspect_1.Aspect();
                aspect.pointcuts.push(pointcut);
                aspect_1.AspectRegistry[aspectName] = aspect;
                return target;
            };
        };
    }
    exports.makeMethodCallAdviceDecorator = makeMethodCallAdviceDecorator;
});
