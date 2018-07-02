import { JoinPoint, Precondition } from '../core/join_point';
import { Advice } from '../core/advice';
import { Pointcut } from '../core/pointcut';
import { AspectRegistry, Targets, Aspect } from '../core/aspect';
import { MemberSelector } from './selectors';
import { MemberPrecondition } from './preconditions';

export type AccessorType = 'get' | 'set';

export class AccessorJointPoint extends JoinPoint {
  constructor(precondition: Precondition, private type: AccessorType) {
    super(precondition);
  }

  public getTarget(fn: Function): Object {
    return fn.prototype;
  }

  protected woveTarget(proto: any, key: string, advice: Advice, woveMetadata: any) {
    const className = proto.constructor.name;
    const self = this;
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (descriptor != null) {
      const descriptorIsAccessor = this.type === 'get' || this.type === 'set';
      const accessor = descriptor[this.type];
      if (descriptorIsAccessor && accessor != null) {
        const accessorIsFunction = accessor != null ? typeof accessor === 'function' : false;
        if (accessorIsFunction) {
          const proxy = function(this: any) {
            const metadata = self.getMetadata(className, key, accessor!, arguments, this, woveMetadata);
            return advice.wove(accessor!, metadata);
          };
          descriptor[this.type] = proxy;
          (descriptor[this.type] as any).__woven__ = true;
          (descriptor[this.type] as any).__bak__ = accessor;
          Object.defineProperty(proto, key, descriptor);
        }
      }
    }
  }

  public match(target: Function): any[] {
    const keys = Object.getOwnPropertyNames(target.prototype);
    const res = keys
      .map(key => {
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
        const preconditionMatches: boolean = this.precondition.assert({
          classDefinition: target,
          fieldName: key,
        });
        const isAccessor = this.type === 'get' || this.type === 'set';
        const accessorIsFunction: boolean =
          isAccessor && descriptor != null ? typeof descriptor[this.type] === 'function' : false;
        if (preconditionMatches && accessorIsFunction) {
          return key;
        }
        return false;
      })
      .filter(val => !!val);
    return res;
  }
}

export function makeFieldGetAdviceDecorator(constr: new (...args: any[]) => Advice) {
  return function(...selectors: MemberSelector[]): MethodDecorator {
    return function<T>(target: Object, prop: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
      const joinPoints = selectors.map(selector => {
        return new AccessorJointPoint(new MemberPrecondition(selector), 'get');
      });
      const pointcut = new Pointcut(joinPoints, <Advice>new constr(target, descriptor.value));
      const aspectName = target.constructor.name;
      const aspect = AspectRegistry.get(aspectName) || new Aspect();
      aspect.pointcuts.push(pointcut);
      AspectRegistry.set(aspectName, aspect);
      return target;
    };
  };
}

export function makeFieldSetAdviceDecorator(constr: new (...args: any[]) => Advice) {
  return function(...selectors: MemberSelector[]): MethodDecorator {
    return function<T>(target: Object, prop: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
      const jointPoints = selectors.map(selector => {
        return new AccessorJointPoint(new MemberPrecondition(selector), 'set');
      });
      const pointcut = new Pointcut(jointPoints, <Advice>new constr(target, descriptor.value));
      const aspectName = target.constructor.name;
      const aspect = AspectRegistry.get(aspectName) || new Aspect();
      aspect.pointcuts.push(pointcut);
      AspectRegistry.set(aspectName, aspect);
      Targets.forEach(({ target, config }) => aspect.wove(target, config));
      return target;
    };
  };
}
