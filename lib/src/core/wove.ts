import {AspectRegistry} from './aspect';

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
