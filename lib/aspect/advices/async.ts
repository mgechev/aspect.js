/// <reference path="../../typing/tsd.d.ts"/>

import { aspectFactory, Aspect } from '../../core/Aspect';

let beforeResolve = aspectFactory('beforeResolve', function (o, p, className) {
  let bak = o[p];
  let advice = this;
  o[p] = function () {
    let promise = bak.apply(this, arguments);
    return promise.then(advice.exec.bind(this, {
      name: p,
      className: className
    }));
  };
});

let beforeReject = aspectFactory('beforeReject', function (o, p, className) {
  let bak = o[p];
  let advice = this;
  o[p] = function () {
    let promise = bak.apply(this, arguments);
    return promise.catch(advice.exec.bind(this, {
      name: p,
      className: className
    }));
  };
});

let afterResolve = aspectFactory('afterResolve', function (o, p, className) {
  let bak = o[p];
  let advice = this;
  o[p] = function () {
    let promise = bak.apply(this, arguments);
    return new Promise(resolve => {
      promise.then(resolve)
      .then(advice.exec.bind(this, {
        name: p,
        className: className
      }));
    })
  };
});

let afterReject = aspectFactory('afterReject', function (o, p, className) {
  let bak = o[p];
  let advice = this;
  o[p] = function () {
    let promise = bak.apply(this, arguments);
    return new Promise((resolve, reject) => {
      promise.catch(reject)
      .then(advice.exec.bind(this, {
        name: p,
        className: className
      }));
    });
  };
});

export {
  beforeResolve,
  beforeReject,
  afterResolve,
  afterReject
};
