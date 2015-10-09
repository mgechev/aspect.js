import {Pointcut} from './pointcut';

export let AspectRegistry: { [name: string]: Aspect; } = {};

export function Wove() {
  return function (target) {
    let keys = Object.getOwnPropertyNames(AspectRegistry);
    console.log('Registered aspects', keys);
    keys.forEach(key => {
      console.log('Trying to wove', key);
      AspectRegistry[key].wove(target);
    });
  };
}

export class Aspect {
  public pointcuts: Pointcut[];
  constructor() {
    this.pointcuts = [];
  }
  wove(target: Function) {
    this.pointcuts.forEach(p => {
      p.apply(target);
    });
  }
}

function makeClassDecorator() {
  throw new Error('Not implemented');
}

function makePropertyDecorator() {
  throw new Error('Not implemented');
}
