import { aspectFactory } from '../../core/Aspect';

let advices = {};
advices.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
  let bak = o[p];
  let advice = this;
  o[p] = function () {
    let promise = bak.apply(this, arguments);
    if (!(promise instanceof Promise)) {
      throw new Error('Can\'t use afterResolve on method, which doesn\'t return a promise');
    }
    return promise.then(advice.exec.bind(this, {
      name: p,
      className: className
    }));
  };
});

advices.afterReject = aspectFactory('afterReject', function (o, p, className) {
  let bak = o[p];
  let advice = this;
  o[p] = function () {
    let promise = bak.apply(this, arguments);
    if (!(promise instanceof Promise)) {
      throw new Error('Can\'t use afterReject on method, which doesn\'t return a promise');
    }
    return promise.catch(advice.exec.bind(this, {
      name: p,
      className: className
    }));
  };
});


export default advices;
