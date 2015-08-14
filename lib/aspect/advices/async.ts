/// <reference path="../typings/tsd.d.ts" />

import { aspectFactory, Aspect } from '../../core/Aspect';

class AsyncAdvices {
  static INSTANCE = new AsyncAdvices();
  afterReject:{(classPattern:RegExp, methodPattern:RegExp):void};
  afterResolve:{(classPattern:RegExp, methodPattern:RegExp):void};
}

AsyncAdvices.INSTANCE.afterResolve = aspectFactory('afterResolve', function (o, p, className) {
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

AsyncAdvices.INSTANCE.afterReject = aspectFactory('afterReject', function (o, p, className) {
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


export default AsyncAdvices;
