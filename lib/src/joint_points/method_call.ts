import {Precondition, JointPoint} from '../core/joint_point';
import {Advice} from '../core/advice';
import {Pointcut} from '../core/pointcut';
import {AspectRegistry, Aspect} from '../core/aspect';

export interface MemberSelector {
  classNamePattern: RegExp;
  methodNamePattern: RegExp;
}

export class MemberPrecondition implements Precondition {
  constructor(private selector: MemberSelector) {}
  assert({className, methodName}): boolean {
    return this.selector.classNamePattern.test(className) &&
      this.selector.methodNamePattern.test(methodName);
  }
}

export class MethodCallJointPoint extends JointPoint {
  wove({fn, matches}, advice: Advice): void {
    let proto = fn.prototype;
    matches.forEach(match => {
      this.woveMethod(proto, match, advice);
    });
  }
  private woveMethod(proto: any, key:string, advice: Advice) {
    let className = proto.constructor.name;
    let bak = proto[key];
    let self = this;
    proto[key] = function () {
      let metadata = self._getMetadata(className, key, arguments, this);
      return advice.wove(bak, metadata);
    };
    proto[key].__woven__ = true;
  }
  match(target): any[] {
    let name = target.name;
    let keys = Object.getOwnPropertyNames(target.prototype);
    let res = keys.map(key => {
      if (this.precondition.assert({ className: name, methodName: key })) {
        return key;
      }
      return false;
    }).filter(val => !!val);
    return res;
  }
}

export function makeMethodCallAdviceDecorator(constr) {
  return function (...selectors: MemberSelector[]) {
    return function (target, prop, descriptor) {
      let jointpoints = selectors.map(selector => {
        return new MethodCallJointPoint(new MemberPrecondition(selector));
      });
      let pointcut = new Pointcut();
      pointcut.advice = <Advice>new constr(target, target[prop]);
      pointcut.jointPoints = jointpoints;
      let aspectName = target.constructor.name;
      let aspect = AspectRegistry[aspectName] || new Aspect();
      aspect.pointcuts.push(pointcut);
      AspectRegistry[aspectName] = aspect;
      return target;
    }
  }
}
