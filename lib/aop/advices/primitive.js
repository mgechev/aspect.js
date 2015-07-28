import Aspect from '../../core/Aspect';
import AspectCollection from '../../core/AspectCollection';
import meld from 'meld';

let advices = {};

'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
  'use strict';
  advices[a] = (classPattern, methodPattern) => {
    return (target, key, descriptor) => {
      let advice = descriptor.value;
      let when = a;
      let apply = (o, p) => {
        meld[a].call(meld, o, p, advice);
      };
      AspectCollection.register(new Aspect({
        classPattern,
        methodPattern,
        advice,
        when,
        apply
      }));
      return descriptor;
    };
  };
});

export default advices;
