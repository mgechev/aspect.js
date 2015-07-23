'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Aspect = require('./core/Aspect');

var _Aspect2 = _interopRequireWildcard(_Aspect);

var _AspectCollection = require('./core/AspectCollection');

var before = function before(classPattern, methodPattern) {
  'use strict';
  return function (target, key) {
    var advice = target[key];
    var when = 'before';
    _AspectCollection.AspectCollection.register(new _Aspect2['default']({
      classPattern: classPattern,
      methodPattern: methodPattern,
      advice: advice,
      when: when
    }));
  };
};

exports['default'] = before;
module.exports = exports['default'];