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
            var className = _a.className, fieldName = _a.fieldName;
            return this.selector.classNamePattern.test(className) &&
                this.selector.fieldNamePattern.test(fieldName);
        };
        return MemberPrecondition;
    })();
    exports.MemberPrecondition = MemberPrecondition;
    var AccessorJointPoint = (function (_super) {
        __extends(AccessorJointPoint, _super);
        function AccessorJointPoint(precondition, type) {
            _super.call(this, precondition);
            this.type = type;
        }
        AccessorJointPoint.prototype.wove = function (_a, advice) {
            var _this = this;
            var fn = _a.fn, matches = _a.matches;
            var proto = fn.prototype;
            matches.forEach(function (match) {
                _this.woveAccessors(proto, match, advice);
            });
        };
        AccessorJointPoint.prototype.woveAccessors = function (proto, key, advice) {
            var className = proto.constructor.name;
            var self = this;
            var descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (typeof descriptor[this.type] === 'function') {
                var bak = descriptor[this.type];
                descriptor[this.type] = function () {
                    var metadata = self.getMetadata(className, key, arguments, this);
                    return advice.wove(bak, metadata);
                };
                descriptor[this.type]['__woven__'] = true;
                Object.defineProperty(proto, key, descriptor);
            }
        };
        AccessorJointPoint.prototype.match = function (target) {
            var _this = this;
            var name = target.name;
            var keys = Object.getOwnPropertyNames(target.prototype);
            var res = keys.map(function (key) {
                var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
                if (_this.precondition.assert({ className: name, fieldName: key }) &&
                    typeof descriptor[_this.type] === 'function') {
                    return key;
                }
                return false;
            }).filter(function (val) { return !!val; });
            return res;
        };
        return AccessorJointPoint;
    })(joint_point_1.JointPoint);
    exports.AccessorJointPoint = AccessorJointPoint;
    function makeFieldGetAdviceDecorator(constr) {
        return function () {
            var selectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selectors[_i - 0] = arguments[_i];
            }
            return function (target, prop, descriptor) {
                var jointpoints = selectors.map(function (selector) {
                    return new AccessorJointPoint(new MemberPrecondition(selector), 'get');
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
    exports.makeFieldGetAdviceDecorator = makeFieldGetAdviceDecorator;
    function makeFieldSetAdviceDecorator(constr) {
        return function () {
            var selectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selectors[_i - 0] = arguments[_i];
            }
            return function (target, prop, descriptor) {
                var jointpoints = selectors.map(function (selector) {
                    return new AccessorJointPoint(new MemberPrecondition(selector), 'set');
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
    exports.makeFieldSetAdviceDecorator = makeFieldSetAdviceDecorator;
});
