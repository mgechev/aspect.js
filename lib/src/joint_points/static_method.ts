import {Precondition, JointPoint} from '../core/joint_point';
import {Advice} from '../core/advice';
import {Pointcut} from '../core/pointcut';
import {AspectRegistry, Targets, Aspect} from '../core/aspect';
import {MethodSelector} from './selectors';
import {MethodPrecondition} from './preconditions';

export class StaticMethodJointPoint extends JointPoint {
  constructor(precondition: Precondition) {
    super(precondition);
  }

  public getTarget(fn):void {
    return fn;
  }

  public match(target): any[] {
    let keys = Object.getOwnPropertyNames(target);
    let res = keys.map(key => {
      let descriptor = Object.getOwnPropertyDescriptor(target, key);
      if (this.precondition.assert({ classInstance: target, methodName: key }) &&
          typeof descriptor.value === 'function') {
        return key;
      }
      return false;
    }).filter(val => !!val);
    return res;
  }

  protected woveTarget(fn: any, key: string, advice: Advice, woveMetadata: any) {
    let className = fn.name;
    let bak = fn[key];
    let self = this;
    fn[key] = function () {
      let metadata = self.getMetadata(className, key, arguments, this, woveMetadata);
      return advice.wove(bak, metadata);
    };
    fn[key].__woven__ = true;
  }
}

export function makeStaticMethodAdviceDecorator(constr) {
  return function (...selectors: MethodSelector[]) {
    return function (target, prop, descriptor) {
      let jointpoints = selectors.map(selector => {
        return new StaticMethodJointPoint(new MethodPrecondition(selector));
      });
      let pointcut = new Pointcut();
      pointcut.advice = <Advice>new constr(target, descriptor.value);
      pointcut.jointPoints = jointpoints;
      let aspectName = target.constructor.name;
      let aspect = AspectRegistry[aspectName] || new Aspect();
      aspect.pointcuts.push(pointcut);
      AspectRegistry[aspectName] = aspect;
      Targets.forEach(({ target, config}) => aspect.wove(target, config));
      return target;
    }
  }
}

