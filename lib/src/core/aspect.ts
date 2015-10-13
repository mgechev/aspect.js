import {Pointcut} from './pointcut';

export let AspectRegistry: { [name: string]: Aspect; } = {};

export function resetRegistry() {
  AspectRegistry = {};
}

export class Aspect {
  public pointcuts: Pointcut[];
  constructor() {
    this.pointcuts = [];
  }
  public wove(target: Function) {
    this.pointcuts.forEach(p => {
      p.apply(target);
    });
  }
}
