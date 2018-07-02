import { AspectRegistry, Targets } from './aspect';

export function weave<TFunction extends Function>(target: TFunction, config?: any): TFunction | undefined {
  if (target.hasOwnProperty('__woven__')) {
    return;
  }

  for (const aspect of Array.from(AspectRegistry.values())) {
    aspect.wove(target, config);
  }

  Targets.add({ target, config });
  (target as any).__woven__ = true;
  return target;
}
