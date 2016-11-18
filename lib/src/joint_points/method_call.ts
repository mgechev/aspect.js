import {Precondition, JointPoint} from '../core/joint_point';
import {Advice} from '../core/advice';
import {Pointcut} from '../core/pointcut';
import {AspectRegistry, Aspect} from '../core/aspect';
import {MethodSelector} from './selectors';
import {MethodPrecondition} from './preconditions';

const BLACK_LIST = [
  'constructor'
];

export class MethodCallJointPoint extends JointPoint {
  public getTarget(fn):any {
    return fn.prototype;
  }

  public match(target): any[] {
    let name = target.name;
    let keys = Object.getOwnPropertyNames(target.prototype);
    keys = keys.filter(key => {
      return BLACK_LIST.indexOf(key) < 0;
    });
    let res = keys.map(key => {
      let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      if (this.precondition.assert({ className: name, methodName: key }) &&
          typeof descriptor.value === 'function') {
        return key;
      }
      return false;
    }).filter(val => !!val);
    return res;
  }

  protected woveTarget(proto: any, key:string, advice: Advice, woveMetadata: any) {
    let className = proto.constructor.name;
    let bak = proto[key];
    let self = this;
    proto[key] = function () {
      let metadata = self.getMetadata(className, key, arguments, this, woveMetadata);
      return advice.wove(bak, metadata);
    };
    proto[key].__woven__ = true;
  }
}

export function makeMethodCallAdviceDecorator(constr) {
  return function (...selectors: MethodSelector[]) {
    return function (target, prop, descriptor) {
      let jointpoints = selectors.map(selector => {
        return new MethodCallJointPoint(new MethodPrecondition(selector));
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

