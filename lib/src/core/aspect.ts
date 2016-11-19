import {Pointcut} from './pointcut';

export let AspectRegistry: { [name: string]: Aspect; } = {};

export let Targets: Set<any> = new Set<any>();

export function resetRegistry() {
  AspectRegistry = {};
  Targets = new Set<any>();
}

export class Aspect {
  public pointcuts: Pointcut[];

  constructor() {
    this.pointcuts = [];
  }

  public wove(target: Function, woveMetadata: any) {
    this.pointcuts.forEach(p => {
      p.apply(target, woveMetadata);
    });
  }
}

