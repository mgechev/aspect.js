import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';

let advices = {};

'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
  'use strict';
  advices[a] = aspectFactory(a, function (o, p) {
    meld[a].call(meld, o, p, this.exec);
  });
});

export default advices;
