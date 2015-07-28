import Aspect from '../../core/Aspect';
import AspectCollection from '../../core/AspectCollection';

class Advice {
  constructor(config) {
    Object.assign(this, config);
  }
}

let adviceFactory = (when, apply) => {
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

export { adviceFactory };
