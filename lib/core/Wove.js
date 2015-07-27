/* global meld */

import AspectCollection from './AspectCollection';
import meld from 'meld';

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
          meld[a.when](proto, p, a.advice);
        });
    }
  });
  return target;
};

export { Wove };
