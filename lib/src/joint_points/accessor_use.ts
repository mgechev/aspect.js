import {Precondition, JointPoint} from '../core/joint_point';
import {Advice} from '../core/advice';
import {Pointcut} from '../core/pointcut';
import {AspectRegistry, Aspect} from '../core/aspect';

export interface MemberSelector {
  classNamePattern: RegExp;
  fieldNamePattern: RegExp;
}

export class MemberPrecondition implements Precondition {
  constructor(private selector: MemberSelector) {}
  assert({className, fieldName}): boolean {
    return this.selector.classNamePattern.test(className) &&
      this.selector.fieldNamePattern.test(fieldName);
  }
}

export class AccessorJointPoint extends JointPoint {
  constructor(precondition: Precondition, private type: string) {
    super(precondition);
  }
  wove({fn, matches}, advice: Advice): void {
    let proto = fn.prototype;
    matches.forEach(match => {
      this.woveAccessors(proto, match, advice);
    });
  }
  private woveAccessors(proto: any, key:string, advice: Advice) {
    let className = proto.constructor.name;
    let self = this;
    let descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (typeof descriptor[this.type] === 'function') {
      let bak = descriptor[this.type];
      descriptor[this.type] = function () {
        let metadata = self._getMetadata(className, key, arguments, this);
        return advice.wove(bak, metadata);
      };
      descriptor[this.type]['__woven__'] = true;
      Object.defineProperty(proto, key, descriptor);
    }
  }
  match(target): any[] {
    let name = target.name;
    let keys = Object.getOwnPropertyNames(target.prototype);
    let res = keys.map(key => {
      if (this.precondition.assert({ className: name, fieldName: key }) &&
          typeof target.prototype[key] !== 'function') {
        return key;
      }
      return false;
    }).filter(val => !!val);
    return res;
  }
}

export function makeFieldGetAdviceDecorator(constr) {
  return function (...selectors: MemberSelector[]) {
    return function (target, prop, descriptor) {
      let jointpoints = selectors.map(selector => {
        return new AccessorJointPoint(new MemberPrecondition(selector), 'get');
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

export function makeFieldSetAdviceDecorator(constr) {
  return function (...selectors: MemberSelector[]) {
    return function (target, prop, descriptor) {
      let jointpoints = selectors.map(selector => {
        return new AccessorJointPoint(new MemberPrecondition(selector), 'set');
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
