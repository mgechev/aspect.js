import Aspect from '../../core/Aspect';
import AspectCollection from '../../core/AspectCollection';

'before around on afterReturning afterThrowing after'.split(' ').forEach(a => {
  'use strict';
  advices[a] = (classPattern, methodPattern) => {
    return (target, key, descriptor) => {
      let advice = descriptor.value;
      let when = a;
      AspectCollection.register(new Aspect({
        classPattern,
        methodPattern,
        advice,
        when
      }));
      return descriptor;
    };
  };
});

export default advices;
