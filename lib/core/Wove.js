/* global meld */

import AspectCollection from './AspectCollection';
import meld from 'meld';

export default (target) => {
  'use strict';
  AspectCollection.aspects.forEach(a => {
    if (a.classPattern.test(target.name)) {
      meld[a.when](target.prototype, a.methodPattern, a.advice);
    }
  });
};
