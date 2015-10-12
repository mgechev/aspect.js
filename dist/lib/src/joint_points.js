(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './joint_points/preconditions', './joint_points/selectors', './joint_points/method_call', './joint_points/accessor_use', './joint_points/static_method'], function (require, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(require('./joint_points/preconditions'));
    __export(require('./joint_points/selectors'));
    __export(require('./joint_points/method_call'));
    __export(require('./joint_points/accessor_use'));
    __export(require('./joint_points/static_method'));
});
