import {AspectRegistry, Targets} from './aspect';

export function weave(target, config?: any) {
  if (target.__woven__) {
    return;
  }
  let keys = Object.getOwnPropertyNames(AspectRegistry);
  keys.forEach(key => {
    AspectRegistry[key].wove(target, config);
  });
  Targets.add({ target, config });
  target.__woven__ = true;
  return target;
}

export function Wove(config?: any) {
  return function (target) {
    return weave(target, config);
  };
}
