import Aspect from '../../core/Aspect';
import AspectCollection from '../../core/AspectCollection';
import { adviceFactory } from './Advice';

let advices = {};
advices.afterResolve = adviceFactory('afterResolve', function (o, p) {
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
