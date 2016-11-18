import {Precondition} from '../core/joint_point';
import {MethodSelector, MemberSelector} from './selectors';

export class MethodPrecondition implements Precondition {
  constructor(private selector: MethodSelector) {}

  assert({classInstance, methodName}): boolean {
    const s = this.selector;
    const className = classInstance.name;

    const matchAnyMethod = (methods: any[], target, methodName: string) => {
      let keys = Object.getOwnPropertyNames(target.prototype);
      return methods.some(f => {
        return target.prototype[methodName] === f;
      });
    };

    const matchClass = (!s.classNamePattern && !s.classes) ||
      (s.classNamePattern && s.classNamePattern.test(className)) ||
      (s.classes && s.classes.some(c => c === classInstance));

    const matchMember = (!s.methodNamePattern && !s.methods) ||
      (s.methodNamePattern && s.methodNamePattern.test(methodName)) ||
      (s.methods && matchAnyMethod(s.methods, classInstance, methodName));

    return matchClass && matchMember;
  }
}

export class MemberPrecondition implements Precondition {
  constructor(private selector: MemberSelector) {}

  assert({className, fieldName}): boolean {
    return this.selector.classNamePattern.test(className) &&
      this.selector.fieldNamePattern.test(fieldName);
  }
}

