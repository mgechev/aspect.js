'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _applyAspects = require('./AspectCollection');

exports['default'] = function (target) {
  'use strict';
  _applyAspects.applyAspects(target.prototype);
};

module.exports = exports['default'];