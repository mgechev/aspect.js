/* global meld */

class AspectCollectionClass {
  constructor() {
    this.aspects = [];
  }
  register(config) {
    this.aspects.push(config);
  }
}

let AspectCollection = new AspectCollectionClass();

let applyAspects = (name, obj) => {
  'use strict';
  AspectCollection.aspects.forEach(a => {
    if (a.methodPattern.test(name)) {
      meld[a.when](obj, a.methodPattern, a.advice);
    }
  });
};

export {
  AspectCollection,
  applyAspects
};
