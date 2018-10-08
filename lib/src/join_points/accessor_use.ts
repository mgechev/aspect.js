import { JointPoint, Precondition } from '../core/join_point';
import { Advice } from '../core/advice';
import { Pointcut } from '../core/pointcut';
import { AspectRegistry, Targets, Aspect } from '../core/aspect';
import { MemberSelector } from './selectors';
import { MemberPrecondition } from './preconditions';

export type AccessorType = 'get' | 'set';

export class AccessorJointPoint extends JointPoint {
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
    if ((this.type === 'get' || this.type === 'set') && typeof descriptor[this.type] === 'function') {
      const bak = descriptor[this.type];
      descriptor[this.type] = function() {
        const metadata = self.getMetadata(className, key, bak, arguments, this, woveMetadata);
        return advice.wove(bak, metadata);
      };
      (descriptor[this.type] as any)['__woven__'] = true;
      Object.defineProperty(proto, key, descriptor);
    }
  }

  public match(target: Function): any[] {
    const keys = Object.getOwnPropertyNames(target.prototype);
    const res = keys
      .map(key => {
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
        if (
          this.precondition.assert({ classDefinition: target, fieldName: key }) &&
          (this.type === 'get' || (this.type === 'set' && typeof descriptor[this.type] === 'function'))
        ) {
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
      const joinpoints = selectors.map(selector => {
        return new AccessorJointPoint(new MemberPrecondition(selector), 'get');
      });
      const pointcut = new Pointcut();
      pointcut.advice = <Advice>new constr(target, descriptor.value);
      pointcut.joinPoints = joinpoints;
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
      const joinpoints = selectors.map(selector => {
        return new AccessorJointPoint(new MemberPrecondition(selector), 'set');
      });
      const pointcut = new Pointcut();
      pointcut.advice = <Advice>new constr(target, descriptor.value);
      pointcut.joinPoints = joinpoints;
      const aspectName = target.constructor.name;
      const aspect = AspectRegistry.get(aspectName) || new Aspect();
      aspect.pointcuts.push(pointcut);
      AspectRegistry.set(aspectName, aspect);
      Targets.forEach(({ target, config }) => aspect.wove(target, config));
      return target;
    };
  };
}
