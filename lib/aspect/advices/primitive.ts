/// <reference path="../../typing/tsd.d.ts"/>

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

let before = registerAspect('before');
let around = registerAspect('around');
let on = registerAspect('on');
let after = registerAspect('after');
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
