'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (initializers) initializers[key] = descriptor.initializer; } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _before$Wove$Aspect = require('../../dist/all.js');

var Logger = (function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createDecoratedClass(Logger, [{
    key: 'logBefore',
    decorators: [_before$Wove$Aspect.before(/.*/, /^get/)],
    value: function logBefore() {
      console.log('Before advice');
    }
  }]);

  return Logger;
})();

var ArticleCollection = (function () {
  function ArticleCollection() {
    _classCallCheck(this, _ArticleCollection);

    this.articles = [{
      id: 42,
      name: 'Lorem ipsum'
    }];
  }

  var _ArticleCollection = ArticleCollection;

  _createClass(_ArticleCollection, [{
    key: 'getArticleById',
    value: function getArticleById(id) {
      return this.articles.filter(function (a) {
        return a.id === id;
      }).pop();
    }
  }]);

  ArticleCollection = _before$Wove$Aspect.Wove(ArticleCollection) || ArticleCollection;
  return ArticleCollection;
})();