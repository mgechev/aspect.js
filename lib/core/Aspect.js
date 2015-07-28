import Advice from './Advice';
import AspectCollection from './AspectCollection';

class Aspect {
  constructor(config) {
    Object.assign(this, config);
  }
}

let aspectFactory = (when, apply) => {
  return (classPattern, methodPattern) => {
    return (target, key, descriptor) => {
      let advice = new Advice({
        exec: descriptor.value,
        when: when,
      });
      let pointcut = {
        classPattern,
        methodPattern
      };
      AspectCollection.register(new Aspect({
        advice,
        apply,
        pointcut
      }));
    };
  };
};

export { aspectFactory };
