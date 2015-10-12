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
})(["require", "exports", '../core/joint_point', '../core/pointcut', '../core/aspect'], function (require, exports) {
    var joint_point_1 = require('../core/joint_point');
    var pointcut_1 = require('../core/pointcut');
    var aspect_1 = require('../core/aspect');
    var MemberPrecondition = (function () {
        function MemberPrecondition(selector) {
            this.selector = selector;
        }
        MemberPrecondition.prototype.assert = function (_a) {
            var className = _a.className, methodName = _a.methodName;
            return this.selector.classNamePattern.test(className) &&
                this.selector.methodNamePattern.test(methodName);
        };
        return MemberPrecondition;
    })();
    exports.MemberPrecondition = MemberPrecondition;
    var BLACK_LIST = [
        'constructor'
    ];
    var MethodCallJointPoint = (function (_super) {
        __extends(MethodCallJointPoint, _super);
        function MethodCallJointPoint() {
            _super.apply(this, arguments);
        }
        MethodCallJointPoint.prototype.wove = function (_a, advice) {
            var _this = this;
            var fn = _a.fn, matches = _a.matches;
            var proto = fn.prototype;
            matches.forEach(function (match) {
                _this.woveMethod(proto, match, advice);
            });
        };
        MethodCallJointPoint.prototype.woveMethod = function (proto, key, advice) {
            var className = proto.constructor.name;
            var bak = proto[key];
            var self = this;
            proto[key] = function () {
                var metadata = self.getMetadata(className, key, arguments, this);
                return advice.wove(bak, metadata);
            };
            proto[key].__woven__ = true;
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
                    return new MethodCallJointPoint(new MemberPrecondition(selector));
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
