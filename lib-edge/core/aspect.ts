export class MethodMetadata {
  public proceed: boolean;
  public name: string;
  public args: any[];
  public context: any;
  public result: any;
}

export class Metadata {
  public method: MethodMetadata;
  public className: string;
  private __advice_metadata__ = true;
}

let AspectRegistry = new Map<string, Aspect>();

export class Aspect {
  public pointcuts: Pointcut[];
  wove(target: Function) {
    this.pointcuts.forEach(p => {
      p.apply(target);
    });
  }
}

export class Pointcut {
  public jointPoints: JointPoint[];
  public advice: Advice;
  apply(descriptor) {
    this.jointPoints.forEach(jp => {
      if (jp.match(descriptor)) {
        jp.wove(descriptor, this.advice);
      }
    });
  }
}

export interface Precondition {
  assert(data: any): boolean;
}

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

interface Target {

}

interface MethodTarget extends Target {
  methodName: string;
  proto: Object;
}

export class Advice {
  constructor(public context: Object, public advice: Function) {}
  wove() {
    throw new Error('Not implemented');
  }
}

export class BeforeAdvice extends Advice {
  wove(target) {

  }
}

export class AfterAdvice extends Advice {
  wove(target) {

  }
}

export class JointPoint {
  constructor(public precondition: Precondition) {}
  wove(descriptor: any, advice: Advice): void {
    throw new Error('Not implemented');
  }
  match(descriptor: any): boolean {
    throw new Error('Not implemented');
  }
}

export class MethodCallJointPoint extends JointPoint {

  wove({proto: Object, prop: string}, advice: Advice): void {

  }
  match(descriptor: any) {
    return true;
  }
}

function makeClassDecorator() {
  throw new Error('Not implemented');
}

function makeMethodDecorator(constr) {
  return function (...selectors: MemberSelector[]) {
    return function (target, name, descriptor) {
      let jointpoints = selectors.map(selector => {
        return new MethodCallJointPoint(new MemberPrecondition(selector));
      });
      let pointcut = new Pointcut();
      pointcut.advice = <Advice>new constr(target, target[name]);
      pointcut.jointPoints = jointpoints;
      let aspect = AspectRegistry.get(target.constructor.name) || new Aspect();
      aspect.pointcuts.push(pointcut);
    }
  }
}

function makePropertyDecorator() {
  throw new Error('Not implemented');
}
