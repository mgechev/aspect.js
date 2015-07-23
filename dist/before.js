'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Aspect = require('./core/Aspect');

var _Aspect2 = _interopRequireWildcard(_Aspect);

var _AspectCollection = require('./core/AspectCollection');

var _AspectCollection2 = _interopRequireWildcard(_AspectCollection);

var before = function before(classPattern, methodPattern) {
  'use strict';
  return function (target, key, descriptor) {
    var advice = descriptor.value;
    var when = 'before';
    _AspectCollection2['default'].register(new _Aspect2['default']({
      classPattern: classPattern,
      methodPattern: methodPattern,
      advice: advice,
      when: when
    }));
  };
};

exports['default'] = before;
module.exports = exports['default'];