import {Precondition} from '../core/joint_point';
import {MethodSelector, MemberSelector} from './selectors';

export class MethodPrecondition implements Precondition {
  constructor(private selector: MethodSelector) {}
  assert({className, methodName}): boolean {
    return this.selector.classNamePattern.test(className) &&
      this.selector.methodNamePattern.test(methodName);
  }
}

export class MemberPrecondition implements Precondition {
  constructor(private selector: MemberSelector) {}
  assert({className, fieldName}): boolean {
    return this.selector.classNamePattern.test(className) &&
      this.selector.fieldNamePattern.test(fieldName);
  }
}
