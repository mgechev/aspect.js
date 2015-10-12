/// <reference path="../../typings/tsd.d.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('../../lib/src/core');
var aspect_1 = require('../../lib/aspect');
var chai_1 = require('chai');
describe('sync advices', function () {
    beforeEach(function () {
        core_1.resetRegistry();
    });
    describe('BeforeAdvice', function () {
        // beforeEach(() => {
        //   resetRegistry();
        // });
        it('should invoke the advice with the appropriate metadata', function (done) {
            var demo;
            var Aspect = (function () {
                function Aspect() {
                }
                Aspect.prototype.before = function (metadata) {
                    chai_1.expect(this).to.deep.equal(Aspect.prototype);
                    chai_1.expect(metadata.method.context).to.eq(demo);
                    chai_1.expect(metadata.className).to.equal('Demo');
                    chai_1.expect(metadata.method.name).to.equal('get');
                    chai_1.expect(metadata.method.args).to.deep.equal([42, 1.618]);
                    done();
                };
                Object.defineProperty(Aspect.prototype, "before",
                    __decorate([
                        aspect_1.beforeMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
                    ], Aspect.prototype, "before", Object.getOwnPropertyDescriptor(Aspect.prototype, "before")));
                return Aspect;
            })();
            var Demo = (function () {
                function Demo() {
                }
                Demo.prototype.get = function (foo, bar) { };
                Demo = __decorate([
                    core_1.Wove()
                ], Demo);
                return Demo;
            })();
            demo = new Demo();
            demo.get(42, 1.618);
        });
        it('should invoke the advice before the target', function (done) {
            var adviceCalled = false;
            var methodCalled = false;
            var Aspect = (function () {
                function Aspect() {
                }
                Aspect.prototype.before = function (metadata) {
                    adviceCalled = true;
                    chai_1.expect(methodCalled).to.equal(false);
                };
                Object.defineProperty(Aspect.prototype, "before",
                    __decorate([
                        aspect_1.beforeMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
                    ], Aspect.prototype, "before", Object.getOwnPropertyDescriptor(Aspect.prototype, "before")));
                return Aspect;
            })();
            var Demo = (function () {
                function Demo() {
                }
                Demo.prototype.get = function () {
                    methodCalled = true;
                    chai_1.expect(adviceCalled).to.equal(true);
                    done();
                };
                Demo = __decorate([
                    core_1.Wove()
                ], Demo);
                return Demo;
            })();
            new Demo().get();
        });
    });
    describe('AfterAdvice', function () {
        it('should invoke the advice with the appropriate metadata', function (done) {
            var demo;
            var Aspect = (function () {
                function Aspect() {
                }
                Aspect.prototype.before = function (metadata) {
                    chai_1.expect(this).to.deep.equal(Aspect.prototype);
                    chai_1.expect(metadata.method.context).to.eq(demo);
                    chai_1.expect(metadata.className).to.equal('Demo');
                    chai_1.expect(metadata.method.name).to.equal('get');
                    chai_1.expect(metadata.method.args).to.deep.equal([42, 1.618]);
                    done();
                };
                Object.defineProperty(Aspect.prototype, "before",
                    __decorate([
                        aspect_1.afterMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
                    ], Aspect.prototype, "before", Object.getOwnPropertyDescriptor(Aspect.prototype, "before")));
                return Aspect;
            })();
            var Demo = (function () {
                function Demo() {
                }
                Demo.prototype.get = function (foo, bar) { };
                Demo = __decorate([
                    core_1.Wove()
                ], Demo);
                return Demo;
            })();
            demo = new Demo();
            demo.get(42, 1.618);
        });
        it('should invoke the advice after the target', function (done) {
            var adviceCalled = false;
            var methodCalled = false;
            var Aspect = (function () {
                function Aspect() {
                }
                Aspect.prototype.before = function (metadata) {
                    adviceCalled = true;
                    chai_1.expect(methodCalled).to.equal(true);
                };
                Object.defineProperty(Aspect.prototype, "before",
                    __decorate([
                        aspect_1.afterMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
                    ], Aspect.prototype, "before", Object.getOwnPropertyDescriptor(Aspect.prototype, "before")));
                return Aspect;
            })();
            var Demo = (function () {
                function Demo() {
                }
                Demo.prototype.get = function () {
                    methodCalled = true;
                    chai_1.expect(adviceCalled).to.equal(false);
                    done();
                };
                Demo = __decorate([
                    core_1.Wove()
                ], Demo);
                return Demo;
            })();
            new Demo().get();
        });
    });
});
