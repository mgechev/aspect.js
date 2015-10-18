(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './core/advice', './core/aspect', './core/joint_point', './core/metadata', './core/pointcut', './core/wove'], function (require, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(require('./core/advice'));
    __export(require('./core/aspect'));
    __export(require('./core/joint_point'));
    __export(require('./core/metadata'));
    __export(require('./core/pointcut'));
    __export(require('./core/wove'));
});
