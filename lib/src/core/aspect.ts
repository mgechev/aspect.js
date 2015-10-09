import {Pointcut} from './pointcut';

export let AspectRegistry: { [name: string]: Aspect; } = {};

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
