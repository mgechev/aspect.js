import {AspectRegistry, Targets} from './aspect';

export function Wove(config?: any) {
  return function (target) {
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
  };
}
