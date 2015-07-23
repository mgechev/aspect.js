'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});
/* global meld */

var AspectCollectionClass = (function () {
  function AspectCollectionClass() {
    _classCallCheck(this, AspectCollectionClass);

    this.aspects = [];
  }

  _createClass(AspectCollectionClass, [{
    key: 'register',
    value: function register(config) {
      this.aspects.push(config);
    }
  }]);

  return AspectCollectionClass;
})();

var AspectCollection = new AspectCollectionClass();

var applyAspects = function applyAspects(name, obj) {
  'use strict';
  AspectCollection.aspects.forEach(function (a) {
    if (a.methodPattern.test(name)) {
      meld[a.when](obj, a.methodPattern, a.advice);
    }
  });
};

exports.AspectCollection = AspectCollection;
exports.applyAspects = applyAspects;