import Aspect from '../../core/Aspect';
import AspectCollection from '../../core/AspectCollection';
import { adviceFactory } from './Advice';
import meld from 'meld';

let advices = {};

'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
  'use strict';
  advices[a] = adviceFactory(a, function (o, p) {
    meld[a].call(meld, o, p, this.exec.advice);
  });
});

export default advices;
