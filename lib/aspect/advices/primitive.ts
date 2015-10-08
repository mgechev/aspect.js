/// <reference path="../../typing/tsd.d.ts"/>

import { extend } from '../../util/util';
import { aspectFactory } from '../../core/Aspect';
import { Metadata, MethodMetadata } from './metadata';
import * as meld from 'meld';

function registerAspect(a) {
  return aspectFactory(a, function (o, p, className) {
    meld[a].call(meld, o, p, this.exec.bind(this, {
      name: p,
      className: className
    }));
  });
}

var before = aspectFactory('before', function () {
  return function (bak, self, metadata:Metadata) {
    self.exec.bind(self.context, metadata).apply(null, metadata.method.args);
    if (bak.__advice__) {
      return bak.bind(self.context, metadata).apply(null, metadata.method.args);
    } else if (!bak.__advice__) {
      if (metadata.method.proceed) {
        return bak.apply(metadata.method.context, metadata.method.args);
      } else {
        return metadata.method.result;
      }
    }
  };
});

var after = aspectFactory('after', function () {
  return function (bak, self, metadata:Metadata) {
    let result = undefined;
    if (bak.__advice__) {
      result = bak.bind(self.context, metadata).apply(null, metadata.method.args);
    } else {
      result = bak.apply(metadata.method.context, metadata.method.args);
    }
    return self.exec.bind(self.context, metadata).apply(null, metadata.method.args) || result;
  };
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
