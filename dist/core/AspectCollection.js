"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AspectCollection = (function () {
  function AspectCollection() {
    _classCallCheck(this, AspectCollection);

    this.aspects = [];
  }

  _createClass(AspectCollection, [{
    key: "register",
    value: function register(config) {
      this.aspects.push(config);
    }
  }]);

  return AspectCollection;
})();

exports["default"] = new AspectCollection();
module.exports = exports["default"];