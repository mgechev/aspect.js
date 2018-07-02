import { weave } from './weave';

export function Wove(config?: any): ClassDecorator {
  return function<TFunction extends Function>(target: TFunction) {
    return weave(target, config);
  };
}
