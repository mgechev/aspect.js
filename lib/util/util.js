function extend(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    args.forEach(function (obj) {
        for (var prop in obj) {
            target[prop] = obj[prop];
        }
    });
    return target;
}
exports.extend = extend;
