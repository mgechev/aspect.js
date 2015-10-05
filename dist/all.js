function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {};
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {};
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {};
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {};
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = ;
exports.aspectFactory = aspectFactory;
void ;
{
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
}
;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {};
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {};
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {
    afterResolve: Aspect_1.Aspect,
    afterReject: Aspect_1.Aspect
};
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {
    afterResolve: {}(classPattern, Regex, methodPattern, Regex), void:  }, afterReject;
;
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var advices = {
    afterResolve: {}(classPattern, RegExp, methodPattern, RegExp), void:  }, afterReject;
;
advices.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
advices.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="./typings/es6-promise/es6-promise.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"]({
                exec: descriptor.value,
                when: when
            });
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(config) {
        Object.assign(this, config);
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(config) {
        Object.assign(this, config);
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = {
                classPattern: classPattern,
                methodPattern: methodPattern
            };
            AspectCollection_1["default"].register(new Aspect({
                advice: advice,
                apply: apply,
                pointcut: pointcut
            }));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.INSTANCE = new AspectCollection();
        this.aspects = new Array();
    }
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    return AspectCollection;
})();
exports["default"] = AspectCollection.INSTANCE;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.INSTANCE = new AspectCollection();
        this.aspects = new Array();
    }
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].INSTANCE.aspects.forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.INSTANCE = new AspectCollection();
        this.aspects = new Array();
    }
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].INSTANCE.getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.INSTANCE = new AspectCollection();
        this.aspects = new Array();
    }
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].INSTANCE.getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.prototype.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(a, function (Aspect) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/tsd.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../typings/tsd.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../typings/tsd.d.ts" />
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

/// <reference path="../../typings/tsd.d.ts" />
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../typings/tsd.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/tsd.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../../typings/tsd.d.ts" />
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise())) {
            throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise())) {
            throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
        }
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports.Advice = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1.Advice(descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = (function () {
    function AsyncAdvices() {
    }
    AsyncAdvices.INSTANCE = new AsyncAdvices();
    return AsyncAdvices;
})();
AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

define(["require", "exports", './core/Wove'], function (require, exports, Wove_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(Wove_1);
});

define(["require", "exports", './advices/primitive', './advices/async'], function (require, exports, primitive_1, async_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(primitive_1);
    __export(async_1);
});

define(["require", "exports"], function (require, exports) {
    var Advice = (function () {
        function Advice(exec, when) {
            this.exec = exec;
            this.when = when;
        }
        return Advice;
    })();
    exports["default"] = Advice;
});

define(["require", "exports", './Advice', './AspectCollection'], function (require, exports, Advice_1, AspectCollection_1) {
    var Aspect = (function () {
        function Aspect(advice, apply, pointcut) {
            this.advice = advice;
            this.apply = apply;
            this.pointcut = pointcut;
        }
        return Aspect;
    })();
    exports.Aspect = Aspect;
    var Pointcut = (function () {
        function Pointcut(classPattern, methodPattern) {
            this.classPattern = classPattern;
            this.methodPattern = methodPattern;
        }
        return Pointcut;
    })();
    exports.Pointcut = Pointcut;
    var aspectFactory = function (when, apply) {
        return function (classPattern, methodPattern) {
            return function (target, key, descriptor) {
                var advice = new Advice_1["default"](descriptor.value, when);
                var pointcut = new Pointcut(classPattern, methodPattern);
                AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
            };
        };
    };
    exports.aspectFactory = aspectFactory;
});

define(["require", "exports"], function (require, exports) {
    var AspectCollection = (function () {
        function AspectCollection() {
            this.aspects = new Array();
            throw new Error('AspectCollection is a Singleton');
        }
        AspectCollection.getInstance = function () {
            return AspectCollection.INSTANCE;
        };
        AspectCollection.prototype.register = function (config) {
            this.aspects.push(config);
        };
        AspectCollection.prototype.getAspects = function () {
            return this.aspects;
        };
        AspectCollection.INSTANCE = new AspectCollection();
        return AspectCollection;
    })();
    exports["default"] = AspectCollection;
});

/* global meld */
define(["require", "exports", './AspectCollection'], function (require, exports, AspectCollection_1) {
    var findMatches = function (arr, pattern) {
        'use strict';
        return arr.filter(function (p) { return pattern.test(p); });
    };
    var Wove = function (target) {
        'use strict';
        AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
            if (a.pointcut.classPattern.test(target.name)) {
                var proto = target.prototype;
                findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                    .forEach(function (p) {
                    a.apply.call(a.advice, proto, p, target.name);
                });
            }
        });
        return target;
    };
    exports.Wove = Wove;
});

define(["require", "exports", '../../core/Aspect'], function (require, exports, Aspect_1) {
    var AsyncAdvices = (function () {
        function AsyncAdvices() {
        }
        AsyncAdvices.INSTANCE = new AsyncAdvices();
        return AsyncAdvices;
    })();
    AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    });
    AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    });
    exports["default"] = AsyncAdvices;
});

define(["require", "exports", '../../core/Aspect', 'meld'], function (require, exports, Aspect_1, meld_1) {
    var advices = {};
    'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
        'use strict';
        advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
            meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
                name: p,
                className: className
            }));
        });
    });
    exports["default"] = advices;
});

define(["require", "exports", './core/Wove'], function (require, exports, Wove_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(Wove_1);
});

define(["require", "exports", './advices/primitive', './advices/async'], function (require, exports, primitive_1, async_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(primitive_1);
    __export(async_1);
});

define(["require", "exports"], function (require, exports) {
    var Advice = (function () {
        function Advice(exec, when) {
            this.exec = exec;
            this.when = when;
        }
        return Advice;
    })();
    exports["default"] = Advice;
});

define(["require", "exports", './Advice', './AspectCollection'], function (require, exports, Advice_1, AspectCollection_1) {
    var Aspect = (function () {
        function Aspect(advice, apply, pointcut) {
            this.advice = advice;
            this.apply = apply;
            this.pointcut = pointcut;
        }
        return Aspect;
    })();
    exports.Aspect = Aspect;
    var Pointcut = (function () {
        function Pointcut(classPattern, methodPattern) {
            this.classPattern = classPattern;
            this.methodPattern = methodPattern;
        }
        return Pointcut;
    })();
    exports.Pointcut = Pointcut;
    var aspectFactory = function (when, apply) {
        return function (classPattern, methodPattern) {
            return function (target, key, descriptor) {
                var advice = new Advice_1["default"](descriptor.value, when);
                var pointcut = new Pointcut(classPattern, methodPattern);
                AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
            };
        };
    };
    exports.aspectFactory = aspectFactory;
});

define(["require", "exports"], function (require, exports) {
    var AspectCollection = (function () {
        function AspectCollection() {
            this.aspects = new Array();
            throw new Error('AspectCollection is a Singleton');
        }
        AspectCollection.getInstance = function () {
            return AspectCollection.INSTANCE;
        };
        AspectCollection.prototype.register = function (config) {
            this.aspects.push(config);
        };
        AspectCollection.prototype.getAspects = function () {
            return this.aspects;
        };
        AspectCollection.INSTANCE = new AspectCollection();
        return AspectCollection;
    })();
    exports["default"] = AspectCollection;
});

/* global meld */
define(["require", "exports", './AspectCollection'], function (require, exports, AspectCollection_1) {
    var findMatches = function (arr, pattern) {
        'use strict';
        return arr.filter(function (p) { return pattern.test(p); });
    };
    var Wove = function (target) {
        'use strict';
        AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
            if (a.pointcut.classPattern.test(target.name)) {
                var proto = target.prototype;
                findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                    .forEach(function (p) {
                    a.apply.call(a.advice, proto, p, target.name);
                });
            }
        });
        return target;
    };
    exports.Wove = Wove;
});

define(["require", "exports", '../../core/Aspect'], function (require, exports, Aspect_1) {
    var AsyncAdvices = (function () {
        function AsyncAdvices() {
        }
        AsyncAdvices.INSTANCE = new AsyncAdvices();
        return AsyncAdvices;
    })();
    AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    });
    AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    });
    exports["default"] = AsyncAdvices;
});

define(["require", "exports", '../../core/Aspect', 'meld'], function (require, exports, Aspect_1, meld_1) {
    var advices = {};
    'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
        'use strict';
        advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
            meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
                name: p,
                className: className
            }));
        });
    });
    exports["default"] = advices;
});

define(["require", "exports", './core/Wove'], function (require, exports, Wove_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(Wove_1);
});

define(["require", "exports", './advices/primitive', './advices/async'], function (require, exports, primitive_1, async_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(primitive_1);
    __export(async_1);
});

define(["require", "exports"], function (require, exports) {
    var Advice = (function () {
        function Advice(exec, when) {
            this.exec = exec;
            this.when = when;
        }
        return Advice;
    })();
    exports["default"] = Advice;
});

define(["require", "exports", './Advice', './AspectCollection'], function (require, exports, Advice_1, AspectCollection_1) {
    var Aspect = (function () {
        function Aspect(advice, apply, pointcut) {
            this.advice = advice;
            this.apply = apply;
            this.pointcut = pointcut;
        }
        return Aspect;
    })();
    exports.Aspect = Aspect;
    var Pointcut = (function () {
        function Pointcut(classPattern, methodPattern) {
            this.classPattern = classPattern;
            this.methodPattern = methodPattern;
        }
        return Pointcut;
    })();
    exports.Pointcut = Pointcut;
    var aspectFactory = function (when, apply) {
        return function (classPattern, methodPattern) {
            return function (target, key, descriptor) {
                var advice = new Advice_1["default"](descriptor.value, when);
                var pointcut = new Pointcut(classPattern, methodPattern);
                AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
            };
        };
    };
    exports.aspectFactory = aspectFactory;
});

define(["require", "exports"], function (require, exports) {
    var AspectCollection = (function () {
        function AspectCollection() {
            this.aspects = new Array();
            throw new Error('AspectCollection is a Singleton');
        }
        AspectCollection.getInstance = function () {
            return AspectCollection.INSTANCE;
        };
        AspectCollection.prototype.register = function (config) {
            this.aspects.push(config);
        };
        AspectCollection.prototype.getAspects = function () {
            return this.aspects;
        };
        AspectCollection.INSTANCE = new AspectCollection();
        return AspectCollection;
    })();
    exports["default"] = AspectCollection;
});

/* global meld */
define(["require", "exports", './AspectCollection'], function (require, exports, AspectCollection_1) {
    var findMatches = function (arr, pattern) {
        'use strict';
        return arr.filter(function (p) { return pattern.test(p); });
    };
    var Wove = function (target) {
        'use strict';
        AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
            if (a.pointcut.classPattern.test(target.name)) {
                var proto = target.prototype;
                findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                    .forEach(function (p) {
                    a.apply.call(a.advice, proto, p, target.name);
                });
            }
        });
        return target;
    };
    exports.Wove = Wove;
});

define(["require", "exports", '../../core/Aspect'], function (require, exports, Aspect_1) {
    var AsyncAdvices = (function () {
        function AsyncAdvices() {
        }
        AsyncAdvices.INSTANCE = new AsyncAdvices();
        return AsyncAdvices;
    })();
    AsyncAdvices.INSTANCE.afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    });
    AsyncAdvices.INSTANCE.afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    });
    exports["default"] = AsyncAdvices;
});

define(["require", "exports", '../../core/Aspect', 'meld'], function (require, exports, Aspect_1, meld_1) {
    var advices = {};
    'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
        'use strict';
        advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
            meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
                name: p,
                className: className
            }));
        });
    });
    exports["default"] = advices;
});

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
class AsyncAdvices {
}
AsyncAdvices.INSTANCE = new AsyncAdvices();
AsyncAdvices.INSTANCE.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
class AsyncAdvices {
}
AsyncAdvices.INSTANCE = new AsyncAdvices();
AsyncAdvices.INSTANCE.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        throw new Error('AspectCollection is a Singleton');
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
class AsyncAdvices {
}
AsyncAdvices.INSTANCE = new AsyncAdvices();
AsyncAdvices.INSTANCE.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE === null) {
            AspectCollection.INSTANCE = new AspectCollection();
        }
        else {
            throw new Error('AspectCollection is a Singleton');
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = null;
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
class AsyncAdvices {
}
AsyncAdvices.INSTANCE = new AsyncAdvices();
AsyncAdvices.INSTANCE.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE === null) {
            AspectCollection.INSTANCE = new AspectCollection();
        }
        else {
            throw new Error('AspectCollection is a Singleton');
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = null;
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
class AsyncAdvices {
}
AsyncAdvices.INSTANCE = new AsyncAdvices();
AsyncAdvices.INSTANCE.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE === null) {
            AspectCollection.INSTANCE = new AspectCollection();
        }
        else {
            throw new Error('AspectCollection is a Singleton');
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = null;
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterReject: {}(classPattern, RegExp, methodPattern, RegExp), void:  }, afterResolve;
AsyncAdvices.INSTANCE.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE === null) {
            AspectCollection.INSTANCE = new AspectCollection();
        }
        else {
            throw new Error('AspectCollection is a Singleton');
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = null;
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices;
AsyncAdvices.INSTANCE.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.INSTANCE.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE === null) {
            AspectCollection.INSTANCE = new AspectCollection();
        }
        else {
            throw new Error('AspectCollection is a Singleton');
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = null;
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices;
AsyncAdvices.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE === null) {
            AspectCollection.INSTANCE = new AspectCollection();
        }
        else {
            throw new Error('AspectCollection is a Singleton');
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = null;
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {};
AsyncAdvices.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
AsyncAdvices.afterReject = aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE === null) {
            AspectCollection.INSTANCE = new AspectCollection();
        }
        else {
            throw new Error('AspectCollection is a Singleton');
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = null;
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    console.log(pattern);
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            console.log(a.pointcut.methodPattern);
            if (a.pointcut.methodPattern) {
                let proto = target.prototype;
                findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                    .forEach(p => {
                    a.apply.call(a.advice, proto, p, target.name);
                });
            }
            else {
                console.log('apply constructor joint-point');
            }
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            console.log(a.pointcut.methodPattern);
            if (a.pointcut.methodPattern) {
                let proto = target.prototype;
                findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                    .forEach(p => {
                    a.apply.call(a.advice, proto, p, target.name);
                });
            }
            else {
                console.log('apply constructor joint-point');
            }
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            if (a.pointcut.methodPattern) {
                let proto = target.prototype;
                findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                    .forEach(p => {
                    a.apply.call(a.advice, proto, p, target.name);
                });
            }
            else {
                console.log('apply constructor joint-point');
            }
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(target.name);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    baforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    baforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    baforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject);
            }).catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject);
                console.log(42);
            }).catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject)
                    .catch(advice.exec.bind(this, {
                    name: p,
                    className: className
                }));
                console.log(42);
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                    advice.exec.bind(this, {
                        name: p,
                        className: className
                    });
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                    advice.exec.bind(this, {
                        name: p,
                        className: className
                    });
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                    console.log(32);
                    advice.exec.bind(this, {
                        name: p,
                        className: className
                    });
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                    advice.exec.bind(this, {
                        name: p,
                        className: className
                    })(e);
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                });
            }).catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject);
            }).catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject);
            })
                .catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
;
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject);
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                    advice.exec.bind(this, {
                        name: p,
                        className: className
                    });
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                    advice.exec.bind(this, {
                        name: p,
                        className: className
                    })(e);
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                }).catch(e => {
                    advice.exec.bind(this, {
                        name: p,
                        className: className
                    })(e);
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(e => {
                    reject(e);
                }).then(e => {
                    advice.exec.bind(this, {
                        name: p,
                        className: className
                    })(e);
                });
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject)
                    .then(advice.exec.bind(this, {
                    name: p,
                    className: className
                })(e));
            });
        };
    })
};
;
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            }).then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject)
                    .then(advice.exec.bind(this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            })
                .then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
afterReject: aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return new Promise((resolve, reject) => {
            promise.catch(reject)
                .then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        });
    };
});
;
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve);
            })
                .then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    })
};
afterReject: aspectFactory('afterReject', function (o, p, className) {
    let bak = o[p];
    let advice = this;
    o[p] = function () {
        let promise = bak.apply(this, arguments);
        return new Promise((resolve, reject) => {
            promise.catch(reject)
                .then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        });
    };
});
;
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve)
                    .then(advice.exec.bind(this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject)
                    .then(advice.exec.bind(this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve)
                    .then(advice.exec.bind(this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject)
                    .then(advice.exec.bind(this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

export * from './core/Wove';

export * from './advices/primitive';
export * from './advices/async';

class Advice {
    constructor(exec, when) {
        this.exec = exec;
        this.when = when;
    }
}
export default Advice;

import Advice from './Advice';
import AspectCollection from './AspectCollection';
class Aspect {
    constructor(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
}
class Pointcut {
    constructor(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
}
let aspectFactory = (when, apply) => {
    return (classPattern, methodPattern) => {
        return (target, key, descriptor) => {
            let advice = new Advice(descriptor.value, when);
            let pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection.getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
export { aspectFactory, Pointcut, Aspect };

class AspectCollection {
    constructor() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    static getInstance() {
        return AspectCollection.INSTANCE;
    }
    register(config) {
        this.aspects.push(config);
    }
    getAspects() {
        return this.aspects;
    }
}
AspectCollection.INSTANCE = new AspectCollection();
export default AspectCollection;

/* global meld */
import AspectCollection from './AspectCollection';
let findMatches = (arr, pattern) => {
    'use strict';
    return arr.filter(p => pattern.test(p));
};
let Wove = (target) => {
    'use strict';
    AspectCollection.getInstance().getAspects().forEach((a) => {
        if (a.pointcut.classPattern.test(target.name)) {
            let proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(p => {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
export { Wove };

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

import { aspectFactory } from '../../core/Aspect';
let AsyncAdvices = {
    beforeResolve: aspectFactory('beforeResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: aspectFactory('beforeReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: aspectFactory('afterResolve', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise(resolve => {
                promise.then(resolve)
                    .then(advice.exec.bind(this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: aspectFactory('afterReject', function (o, p, className) {
        let bak = o[p];
        let advice = this;
        o[p] = function () {
            let promise = bak.apply(this, arguments);
            return new Promise((resolve, reject) => {
                promise.catch(reject)
                    .then(advice.exec.bind(this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
export default AsyncAdvices;

import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';
let advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
    'use strict';
    advices[a] = aspectFactory(a, function (o, p, className) {
        meld[a].call(meld, o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
export default advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

/// <reference path="../../typing/tsd.d.ts"/>
var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

/// <reference path="../../typing/tsd.d.ts"/>
var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

/// <reference path="../typing/tsd.d.ts"/>
var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

/// <reference path="../typing/tsd.d.ts"/>
var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports.AsyncAdvices = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
exports.advices = advices;
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var AsyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports.AsyncAdvices = AsyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
exports.advices = advices;
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports.asyncAdvices = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
exports.advices = advices;
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports.asyncAdvices = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
exports.advices = advices;
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Wove_1 = require('./core/Wove');
exports.Wove = Wove_1.Wove;
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Wove_1 = require('./core/Wove');
exports.Wove = Wove_1.Wove;
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports["default"] = { Wove: Wove };
from;
'./core/Wove';
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports["default"] = { Wove: Wove };
from;
'./core/Wove';
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

var primitive_1 = require('./advices/primitive');
var async_1 = require('./advices/async');
primitive_1["default"];
async_1["default"];

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var primitive_1 = require('./advices/primitive');
var async_1 = require('./advices/async');
primitive_1["default"];
async_1["default"];

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require());
foo;
from;
'./advices/primitive';
__export(require());
bar;
from;
'./advices/async';

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require());
foo;
from;
'./advices/primitive';
__export(require());
bar;
from;
'./advices/async';

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

var foo = require('./advices/primitive');
var bar = require('./advices/async');
exports["default"] = Object.assign(foo, bar);

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

var foo = require('./advices/primitive');
var bar = require('./advices/async');
exports["default"] = Object.assign(foo, bar);

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var primitive_1 = require('./advices/primitive');
exports.foo = primitive_1.default;
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var primitive_1 = require('./advices/primitive');
exports.foo = primitive_1.default;
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
 * as;
foo;
from;
'./advices/primitive';
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
 * as;
foo;
from;
'./advices/primitive';
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var asyncAdvices = {
    beforeResolve: Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.then(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    beforeReject: Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var promise = bak.apply(this, arguments);
            return promise.catch(advice.exec.bind(this, {
                name: p,
                className: className
            }));
        };
    }),
    afterResolve: Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve) {
                promise.then(resolve)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    }),
    afterReject: Aspect_1.aspectFactory('afterReject', function (o, p, className) {
        var bak = o[p];
        var advice = this;
        o[p] = function () {
            var _this = this;
            var promise = bak.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                promise.catch(reject)
                    .then(advice.exec.bind(_this, {
                    name: p,
                    className: className
                }));
            });
        };
    })
};
exports["default"] = asyncAdvices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
 * as;
foo;
from;
'./advices/primitive';
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
 * as;
foo;
from;
'./advices/primitive';
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/primitive'));
__export(require('./advices/async'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
var primitive_1 = require('./advices/primitive');
primitive_1["default"];

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
var primitive_1 = require('./advices/primitive');
primitive_1["default"];

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));
console.log(System);

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));
console.log(System);

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
var before = advices.before, around = advices.around, on = advices.on, afterReturning = advices.afterReturning, afterThrowing = advices.afterThrowing, after = advices.after;
exports.before = before;
exports.around = around;
exports.on = on;
exports.afterReturning = afterReturning;
exports.afterThrowing = afterThrowing;
exports.after = after;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
var before = advices.before, around = advices.around, on = advices.on, afterReturning = advices.afterReturning, afterThrowing = advices.afterThrowing, after = advices.after;
exports.before = before;
exports.around = around;
exports.on = on;
exports.afterReturning = afterReturning;
exports.afterThrowing = afterThrowing;
exports.after = after;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
var aspectFactory = function (when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
};
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
return function (classPattern, methodPattern) {
    return function (target, key, descriptor) {
        var advice = new Advice_1["default"](descriptor.value, when);
        var pointcut = new Pointcut(classPattern, methodPattern);
        AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
    };
};
;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
return function (classPattern, methodPattern) {
    return function (target, key, descriptor) {
        var advice = new Advice_1["default"](descriptor.value, when);
        var pointcut = new Pointcut(classPattern, methodPattern);
        AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
    };
};
;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
var advices = {};
'before around on afterReturning afterThrowing after'.split(' ').forEach(function (a) {
    'use strict';
    advices[a] = Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
            name: p,
            className: className
        }));
    });
});
exports["default"] = advices;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
function registerAspect(a) {
    Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
function registerAspect(a) {
    Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
function registerAspect(a) {
    return Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var meld_1 = require('meld');
function registerAspect(a) {
    return Aspect_1.aspectFactory(a, function (o, p, className) {
        meld_1["default"][a].call(meld_1["default"], o, p, this.exec.bind(this, {
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(exec, when) {
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var invocation = { proceed: true };
    o[p] = function () {
        var params = {
            name: p,
            className: className,
            invocation: invocation
        };
        this.exec.bind(this, params).apply(arguments);
        if (invocation.proceed) {
            bak.apply(this, arguments);
        }
    }.bind(o);
});
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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var invocation = { proceed: true };
    o[p] = function () {
        var params = {
            name: p,
            className: className,
            invocation: invocation
        };
        this.exec.bind(this, params).apply(arguments);
        if (invocation.proceed) {
            bak.apply(this, arguments);
        }
    }.bind(o);
});
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(context, exec, when) {
        this.context = context;
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(context, exec, when) {
        this.context = context;
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var invocation = { proceed: true, result: undefined };
    var self = this;
    o[p] = function () {
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this
        };
        self.exec.bind(this, params).apply(null, arguments);
        if (invocation.proceed) {
            return bak.apply(this, arguments);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var result = bak.apply(this, arguments);
        var params = {
            name: p,
            className: className,
            result: result,
            context: this
        };
        return self.exec.bind(this, params).apply(null, arguments);
    };
    return o;
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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var invocation = { proceed: true, result: undefined };
    var self = this;
    o[p] = function () {
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this
        };
        self.exec.bind(this, params).apply(null, arguments);
        if (invocation.proceed) {
            return bak.apply(this, arguments);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var result = bak.apply(this, arguments);
        var params = {
            name: p,
            className: className,
            result: result,
            context: this
        };
        return self.exec.bind(this, params).apply(null, arguments);
    };
    return o;
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(context, exec, when) {
        this.context = context;
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(context, exec, when) {
        this.context = context;
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var invocation = { proceed: true, result: undefined };
    var self = this;
    o[p] = function () {
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this
        };
        self.exec.bind(self.context, params).apply(null, arguments);
        if (invocation.proceed) {
            return bak.apply(this, arguments);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var result = bak.apply(this, arguments);
        var params = {
            name: p,
            className: className,
            result: result,
            context: this
        };
        return self.exec.bind(self.context, params).apply(null, arguments);
    };
    return o;
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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var invocation = { proceed: true, result: undefined };
    var self = this;
    o[p] = function () {
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this
        };
        self.exec.bind(self.context, params).apply(null, arguments);
        if (invocation.proceed) {
            return bak.apply(this, arguments);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var result = bak.apply(this, arguments);
        var params = {
            name: p,
            className: className,
            result: result,
            context: this
        };
        return self.exec.bind(self.context, params).apply(null, arguments);
    };
    return o;
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(context, exec, when) {
        this.context = context;
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(context, exec, when) {
        this.context = context;
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                console.log(p);
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var util_1 = require('../../util/util');
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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var invocation = { proceed: true, result: undefined };
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this,
            __aop_metadata__: true
        };
        var args = arguments;
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        self.exec.bind(self.context, params).apply(null, args);
        if (invocation.proceed && !bak.__advice__) {
            return bak.apply(this, args);
        }
        else if (bak.__advice__) {
            return bak.bind(this, params).apply(null, args);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var args = arguments;
        var params = {
            name: p,
            className: className,
            context: this,
            result: undefined,
            __aop_metadata__: true
        };
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        var result = bak.apply(this, arguments);
        params.result = result;
        return self.exec.bind(this, params).apply(null, args) || result;
    };
    return o;
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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var util_1 = require('../../util/util');
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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var invocation = { proceed: true, result: undefined };
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this,
            __aop_metadata__: true
        };
        var args = arguments;
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        self.exec.bind(self.context, params).apply(null, args);
        if (invocation.proceed && !bak.__advice__) {
            return bak.apply(this, args);
        }
        else if (bak.__advice__) {
            return bak.bind(this, params).apply(null, args);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var args = arguments;
        var params = {
            name: p,
            className: className,
            context: this,
            result: undefined,
            __aop_metadata__: true
        };
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        var result = bak.apply(this, arguments);
        params.result = result;
        return self.exec.bind(this, params).apply(null, args) || result;
    };
    return o;
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./core/Wove'));
__export(require('./aspect/advices'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(context, exec, when) {
        this.context = context;
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./advices/async'));
__export(require('./advices/primitive'));

var Advice = (function () {
    function Advice(context, exec, when) {
        this.context = context;
        this.exec = exec;
        this.when = when;
    }
    return Advice;
})();
exports["default"] = Advice;

var Advice_1 = require('./Advice');
var AspectCollection_1 = require('./AspectCollection');
var Aspect = (function () {
    function Aspect(advice, apply, pointcut) {
        this.advice = advice;
        this.apply = apply;
        this.pointcut = pointcut;
    }
    return Aspect;
})();
exports.Aspect = Aspect;
var Pointcut = (function () {
    function Pointcut(classPattern, methodPattern) {
        this.classPattern = classPattern;
        this.methodPattern = methodPattern;
    }
    return Pointcut;
})();
exports.Pointcut = Pointcut;
function aspectFactory(when, apply) {
    return function (classPattern, methodPattern) {
        return function (target, key, descriptor) {
            var advice = new Advice_1["default"](target, descriptor.value, when);
            var pointcut = new Pointcut(classPattern, methodPattern);
            AspectCollection_1["default"].getInstance().register(new Aspect(advice, apply, pointcut));
        };
    };
}
exports.aspectFactory = aspectFactory;

var AspectCollection = (function () {
    function AspectCollection() {
        this.aspects = new Array();
        if (AspectCollection.INSTANCE) {
            throw new Error('AspectCollection is a Singleton');
        }
        else {
            AspectCollection.INSTANCE = this;
        }
    }
    AspectCollection.getInstance = function () {
        return AspectCollection.INSTANCE;
    };
    AspectCollection.prototype.register = function (config) {
        this.aspects.push(config);
    };
    AspectCollection.prototype.getAspects = function () {
        return this.aspects;
    };
    AspectCollection.INSTANCE = new AspectCollection();
    return AspectCollection;
})();
exports["default"] = AspectCollection;

/* global meld */
var AspectCollection_1 = require('./AspectCollection');
var findMatches = function (arr, pattern) {
    'use strict';
    return arr.filter(function (p) { return pattern.test(p); });
};
var Wove = function (target) {
    'use strict';
    AspectCollection_1["default"].getInstance().getAspects().forEach(function (a) {
        if (a.pointcut.classPattern.test(target.name)) {
            var proto = target.prototype;
            findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
                .forEach(function (p) {
                a.apply.call(a.advice, proto, p, target.name);
            });
        }
    });
    return target;
};
exports.Wove = Wove;

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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var util_1 = require('../../util/util');
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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var invocation = { proceed: true, result: undefined };
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this,
            __aop_metadata__: true
        };
        var args = arguments;
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        self.exec.bind(self.context, params).apply(null, args);
        if (invocation.proceed && !bak.__advice__) {
            return bak.apply(this, args);
        }
        else if (bak.__advice__) {
            return bak.bind(this, params).apply(null, args);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var args = arguments;
        var params = {
            name: p,
            className: className,
            context: this,
            result: undefined,
            __aop_metadata__: true
        };
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        var result = bak.apply(this, arguments);
        params.result = result;
        return self.exec.bind(this, params).apply(null, args) || result;
    };
    return o;
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

/// <reference path="../../typing/tsd.d.ts"/>
var Aspect_1 = require('../../core/Aspect');
var beforeResolve = Aspect_1.aspectFactory('beforeResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.then(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeResolve = beforeResolve;
var beforeReject = Aspect_1.aspectFactory('beforeReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var promise = bak.apply(this, arguments);
        return promise.catch(advice.exec.bind(this, {
            name: p,
            className: className
        }));
    };
});
exports.beforeReject = beforeReject;
var afterResolve = Aspect_1.aspectFactory('afterResolve', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve) {
            promise.then(resolve)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterResolve = afterResolve;
var afterReject = Aspect_1.aspectFactory('afterReject', function (o, p, className) {
    var bak = o[p];
    var advice = this;
    o[p] = function () {
        var _this = this;
        var promise = bak.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            promise.catch(reject)
                .then(advice.exec.bind(_this, {
                name: p,
                className: className
            }));
        });
    };
});
exports.afterReject = afterReject;

/// <reference path="../../typing/tsd.d.ts"/>
var util_1 = require('../../util/util');
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
var before = Aspect_1.aspectFactory('before', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var invocation = { proceed: true, result: undefined };
        var params = {
            name: p,
            className: className,
            invocation: invocation,
            context: this,
            __aop_metadata__: true
        };
        var args = arguments;
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        self.exec.bind(self.context, params).apply(null, args);
        if (invocation.proceed && !bak.__advice__) {
            return bak.apply(this, args);
        }
        else if (bak.__advice__) {
            return bak.bind(this, params).apply(null, args);
        }
        else {
            return invocation.result;
        }
    };
    return o;
});
exports.before = before;
var after = Aspect_1.aspectFactory('after', function (o, p, className) {
    var bak = o[p];
    var self = this;
    o[p] = function () {
        var args = arguments;
        var params = {
            name: p,
            className: className,
            context: this,
            result: undefined,
            __aop_metadata__: true
        };
        if (args[0].__aop_metadata__) {
            util_1.extend(params, args[0]);
            args = [].slice.call(args, 1, args.length);
        }
        var result = bak.apply(this, arguments);
        params.result = result;
        return self.exec.bind(this, params).apply(null, args) || result;
    };
    return o;
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
