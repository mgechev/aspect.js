import {AspectRegistry, Targets} from './aspect';

export function weave(target, config?: any) {
  if (target.__woven__) {
    return;
  }

  for (const aspect of Array.from(AspectRegistry.values())) {
    aspect.wove(target, config);
  }

  Targets.add({ target, config });
  target.__woven__ = true;
  return target;
}

export function Wove(config?: any) {
  return function (target) {
    return weave(target, config);
  };
}
