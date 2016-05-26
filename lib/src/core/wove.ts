import {AspectRegistry} from './aspect';

export function Wove() {
  return function (target) {
    let keys = Object.getOwnPropertyNames(AspectRegistry);
    keys.forEach(key => {
      AspectRegistry[key].wove(target);
    });
    return target;
  };
}
