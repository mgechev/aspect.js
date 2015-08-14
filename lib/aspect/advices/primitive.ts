import { aspectFactory } from '../../core/Aspect';
import meld from 'meld';

let advices = {};

'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
  'use strict';
  advices[a] = aspectFactory(a, function (o, p, className) {
    meld[a].call(meld, o, p, this.exec.bind(this, {
      name: p,
      className: className
    }));
  });
});

export default advices;
