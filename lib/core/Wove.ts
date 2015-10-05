/* global meld */

import AspectCollection from './AspectCollection';
import {Aspect} from './Aspect';

let findMatches = (arr:any[], pattern:RegExp) => {
  'use strict';
  return arr.filter(p => pattern.test(p));
};

let Wove = (target:{name:string, prototype:Object}) => {
  'use strict';
  AspectCollection.getInstance().getAspects().forEach((a:Aspect) => {
    if (a.pointcut.classPattern.test(target.name)) {
      let proto = target.prototype;
      findMatches(Object.getOwnPropertyNames(proto), a.pointcut.methodPattern)
        .forEach(p => {
          console.log(p);
          a.apply.call(a.advice, proto, p, target.name);
        });
    }
  });
  return target;
};

export { Wove };

