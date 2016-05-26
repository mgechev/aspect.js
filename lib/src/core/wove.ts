import {AspectRegistry} from './aspect';

export function Wove(config) {
  return function (target) {
    let keys = Object.getOwnPropertyNames(AspectRegistry);
    keys.forEach(key => {
      AspectRegistry[key].wove(target, config);
    });
    return target;
  };
}
