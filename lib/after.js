import Aspect from './core/Aspect';
import AspectCollection from './core/AspectCollection';

let after = (classPattern, methodPattern) => {
  'use strict';
  return (target, key, descriptor) => {
    let advice = descriptor.value;
    let when = 'after';
    AspectCollection.register(new Aspect({
      classPattern,
      methodPattern,
      advice,
      when
    }));
  };
};

export default after;
