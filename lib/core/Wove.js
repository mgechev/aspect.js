/* global meld */

import AspectCollection from './AspectCollection';

let findMatches = (arr, pattern) => {
  'use strict';
  return arr.filter(p => pattern.test(p));
};

let Wove = (target) => {
  'use strict';
  AspectCollection.aspects.forEach(a => {
    if (a.classPattern.test(target.name)) {
      let proto = target.prototype;
      findMatches(Object.getOwnPropertyNames(proto), a.methodPattern)
        .forEach(p => {
          a.apply(proto, p);
        });
    }
  });
  return target;
};

export { Wove };
