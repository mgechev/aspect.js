/// <reference path="../../typing/tsd.d.ts"/>

import { extend } from '../../util/util';
import { aspectFactory } from '../../core/Aspect';
import * as meld from 'meld';

function registerAspect(a) {
  return aspectFactory(a, function (o, p, className) {
    meld[a].call(meld, o, p, this.exec.bind(this, {
      name: p,
      className: className
    }));
  });
}

var before = aspectFactory('before', function (o, p, className) {
  var bak = o[p];
  var self = this;
  o[p] = function () {
    var invocation = { proceed: true, result: undefined };
      var params = {
        name: p,
        className: className,
        invocation: invocation,
        context: this,
        __aop_metadata__: true
      };
      var args = arguments;
      if (args[0].__aop_metadata__) {
        extend(params, args[0]);
        args = [].slice.call(args, 1, args.length);
      }
      self.exec.bind(self.context, params).apply(null, args);
      if (invocation.proceed && !bak.__advice__) {
        return bak.apply(this, args);
      } else if (bak.__advice__) {
        return bak.bind(this, params).apply(null, args);
      } else {
        return invocation.result;
      }
  };
  return o;
});

var after = aspectFactory('after', function (o, p, className) {
  let bak = o[p];
  let self = this;
  o[p] = function () {
    let args = arguments;
    let params = {
      name: p,
      className: className,
      context: this,
      result: undefined,
      __aop_metadata__: true
    };
    if (args[0].__aop_metadata__) {
      extend(params, args[0]);
      args = [].slice.call(args, 1, args.length);
    }
    let result = bak.apply(this, arguments);
    params.result = result;
    return self.exec.bind(this, params).apply(null, args) || result;
  };
  return o;
});

let around = registerAspect('around');
let on = registerAspect('on');
let afterReturning = registerAspect('afterReturning');
let afterThrowing = registerAspect('afterThrowing');

export {
  before,
  around,
  on,
  after,
  afterReturning,
  afterThrowing
};
