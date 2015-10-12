import {Precondition, JointPoint} from '../core/joint_point';
import {Advice} from '../core/advice';
import {Pointcut} from '../core/pointcut';
import {AspectRegistry, Aspect} from '../core/aspect';

export interface StaticMethodSelector {
  classNamePattern: RegExp;
  methodNamePattern: RegExp;
}

export class StaticMethodPrecondition implements Precondition {
  constructor(private selector: StaticMethodSelector) {}
  assert({className, methodName}): boolean {
    return this.selector.classNamePattern.test(className) &&
      this.selector.methodNamePattern.test(methodName);
  }
}

export class StaticMethodJointPoint extends JointPoint {
  constructor(precondition: Precondition) {
    super(precondition);
  }
  wove({fn, matches}, advice: Advice): void {
    matches.forEach(match => {
      this.woveMethods(fn, match, advice);
    });
  }
  private woveMethods(fn: any, key:string, advice: Advice) {
    let className = fn.name;
    let bak = fn[key];
    let self = this;
    fn[key] = function () {
      let metadata = self.getMetadata(className, key, arguments, this);
      return advice.wove(bak, metadata);
    };
    fn[key].__woven__ = true;
  }
  match(target): any[] {
    let name = target.name;
    let keys = Object.getOwnPropertyNames(target);
    let res = keys.map(key => {
      let descriptor = Object.getOwnPropertyDescriptor(target, key);
      if (this.precondition.assert({ className: name, methodName: key }) &&
          typeof descriptor.value === 'function') {
        return key;
      }
      return false;
    }).filter(val => !!val);
    return res;
  }
}

export function makeStaticMethodAdviceDecorator(constr) {
  return function (...selectors: StaticMethodSelector[]) {
    return function (target, prop, descriptor) {
      let jointpoints = selectors.map(selector => {
        return new StaticMethodJointPoint(new StaticMethodPrecondition(selector));
      });
      let pointcut = new Pointcut();
      pointcut.advice = <Advice>new constr(target, descriptor.value);
      pointcut.jointPoints = jointpoints;
      let aspectName = target.constructor.name;
      let aspect = AspectRegistry[aspectName] || new Aspect();
      aspect.pointcuts.push(pointcut);
      AspectRegistry[aspectName] = aspect;
      return target;
    }
  }
}
