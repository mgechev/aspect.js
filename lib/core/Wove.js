/* global meld */

import AspectCollection from './AspectCollection';

let findMatches = (arr, pattern) => {
  'use strict';
  return arr.filter(p => pattern.test(p));
};

let Wove = (target) => {
  'use strict';
  AspectCollection.aspects.forEach(a => {
    if (a.pointcut.classPattern.test(target.name)) {
      let proto = target.prototype;
      findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
        .forEach(p => {
          a.apply.call(a.advice, proto, p, target.name);
        });
    }
  });
  return target;
};

export { Wove };
