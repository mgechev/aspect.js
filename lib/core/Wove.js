/* global meld */

import AspectCollection from './AspectCollection';
import meld from 'meld';

let findMatches = (arr, pattern) => {
  'use strict';
  return arr.filter(p => pattern.test(p));
};

export default (target) => {
  'use strict';
  AspectCollection.aspects.forEach(a => {
    if (a.classPattern.test(target.name)) {
      target = target.prototype;
      findMatches(Object.getOwnPropertyNames(target), a.methodPattern)
        .forEach(p => {
          meld[a.when](target, p, a.advice);
        });
    }
  });
};
