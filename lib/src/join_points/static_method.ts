import { Precondition, JointPoint } from '../core/join_point';
import { Advice } from '../core/advice';
import { Pointcut } from '../core/pointcut';
import { AspectRegistry, Targets, Aspect } from '../core/aspect';
import { MethodSelector } from './selectors';
import { MethodPrecondition } from './preconditions';

export class StaticMethodJointPoint extends JointPoint {
  constructor(precondition: Precondition) {
    super(precondition);
  }

  public getTarget(fn: Function): Object {
    return fn;
  }

  public match(target: Object): string[] {
    const keys = Object.getOwnPropertyNames(target);
    const res = keys.filter(key => {
      const descriptor = Object.getOwnPropertyDescriptor(target, key);
      return (
        this.precondition.assert({
          classDefinition: target,
          methodName: key,
        }) && typeof descriptor.value === 'function'
      );
    });
    return res;
  }

  protected woveTarget(fn: any, key: string, advice: Advice, woveMetadata: any) {
    let className = fn.name;
    let bak = fn[key];
    let self = this;
    fn[key] = function() {
      let metadata = self.getMetadata(className, key, bak, arguments, this, woveMetadata);
      return advice.wove(bak, metadata);
    };
    fn[key].__woven__ = true;
  }
}

export function makeStaticMethodAdviceDecorator(constr: any) {
  return function(...selectors: MethodSelector[]): MethodDecorator {
    return function<T>(target: Object, prop: symbol | string, descriptor: TypedPropertyDescriptor<T>) {
      let joinpoints = selectors.map(selector => {
        return new StaticMethodJointPoint(new MethodPrecondition(selector));
      });
      let pointcut = new Pointcut();
      pointcut.advice = <Advice>new constr(target, descriptor.value);
      pointcut.joinPoints = joinpoints;
      let aspectName = target.constructor.name;
      let aspect = AspectRegistry.get(aspectName) || new Aspect();
      aspect.pointcuts.push(pointcut);
      AspectRegistry.set(aspectName, aspect);
      Targets.forEach(({ target, config }) => aspect.wove(target, config));
      return target;
    };
  };
}
