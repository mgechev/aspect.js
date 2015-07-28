import Aspect from '../../core/Aspect';
import AspectCollection from '../../core/AspectCollection';
import { aspectFactory } from '../../core/Aspect';

let advices = {};
advices.afterResolve = aspectFactory('afterResolve', function (o, p) {
  let bak = o[p];
  let advice = this;
  o[p] = function () {
    let promise = bak.apply(this, arguments);
    if (!(promise instanceof Promise)) {
      throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
    }
    promise.then(advice.exec.bind(this));
  };
});

export default advices;
