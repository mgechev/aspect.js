import Aspect from '../../core/Aspect';
import AspectCollection from '../../core/AspectCollection';

let advices = {};
advices.afterResolve = (classPattern, methodPattern) => {
  return (target, key, descriptor) => {
    let advice = descriptor.value;
    let when = 'afterResolve';
    let apply = (o, p) => {
      let bak = o[p];
      o[p] = function () {
        let promise = bak.apply(this, arguments);
        if (!(promise instanceof Promise)) {
          throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
        }
        promise.then(advice.bind(this));
      };
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

export default advices;
