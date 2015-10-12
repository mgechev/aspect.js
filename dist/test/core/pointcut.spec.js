/// <reference path="../../typings/tsd.d.ts"/>
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
})(["require", "exports", '../../lib/src/core', 'chai'], function (require, exports) {
    var core_1 = require('../../lib/src/core');
    var chai_1 = require('chai');
    var SimpleJP = (function (_super) {
        __extends(SimpleJP, _super);
        function SimpleJP() {
            _super.apply(this, arguments);
        }
        SimpleJP.prototype.match = function (descriptor) {
            if (this.precondition.assert(descriptor)) {
                return [1];
            }
            return [];
        };
        SimpleJP.prototype.wove = function () { };
        return SimpleJP;
    })(core_1.JointPoint);
    var SimplePrecondition = (function () {
        function SimplePrecondition() {
        }
        SimplePrecondition.prototype.assert = function (data) {
            return true;
        };
        return SimplePrecondition;
    })();
    // TODO(mgechev) refactor with spies
    describe('Pointcut', function () {
        var pc;
        var jp1;
        var jp2;
        beforeEach(function () {
            pc = new core_1.Pointcut();
            jp1 = new SimpleJP(new SimplePrecondition());
            jp1.precondition = new SimplePrecondition();
            jp2 = new SimpleJP(new SimplePrecondition());
            jp2.precondition = new SimplePrecondition();
            pc.jointPoints = [jp1, jp2];
        });
        it('Match should be invoked', function (done) {
            var bak = jp1.match;
            var called1 = false;
            jp1.match = function (d) {
                bak.call(this, d);
                called1 = true;
                return [];
            };
            var bak2 = jp1.match;
            var called2 = false;
            jp2.match = function (d) {
                bak2.call(this, d);
                called2 = true;
                return [];
            };
            pc.apply({});
            chai_1.expect(called1).to.equal(true);
            chai_1.expect(called2).to.equal(true);
            done();
        });
    });
});
