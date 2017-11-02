import { Pointcut } from './pointcut';

export let AspectRegistry = new Map<string, Aspect>();

export let Targets = new Set<any>();

export function resetRegistry() {
  AspectRegistry = new Map<string, Aspect>();
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
