'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
/* global meld */

var _AspectCollection = require('./AspectCollection');

var _AspectCollection2 = _interopRequireWildcard(_AspectCollection);

var _meld = require('meld');

var _meld2 = _interopRequireWildcard(_meld);

exports['default'] = function (target) {
  'use strict';
  _AspectCollection2['default'].aspects.forEach(function (a) {
    if (a.classPattern.test(target.name)) {
      _meld2['default'][a.when](target.prototype, a.methodPattern, a.advice);
    }
  });
};

module.exports = exports['default'];