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

let AspectRegistry: { [name: string]: Aspect; } = {};

export function Wove() {
  return function (target) {
    let keys = Object.getOwnPropertyNames(AspectRegistry);
    console.log('Registered aspects', keys);
    keys.forEach(key => {
      console.log('Trying to wove', key);
      AspectRegistry[key].wove(target);
    });
  };
}

export class Aspect {
  public pointcuts: Pointcut[];
  constructor() {
    this.pointcuts = [];
  }
  wove(target: Function) {
    this.pointcuts.forEach(p => {
      p.apply(target);
    });
  }
}

export class Pointcut {
  public jointPoints: JointPoint[];
  public advice: Advice;
  apply(fn) {
    this.jointPoints.forEach(jp => {
      let matches = jp.match(fn);
      jp.wove({fn, matches}, this.advice);
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

export abstract class Advice {
  constructor(public context: Object, public advice: Function) {}
  abstract wove(target: Function);
}

export class BeforeAdvice extends Advice {
  wove(target: Function) {
    target();
    this.advice();
  }
}

export class AfterAdvice extends Advice {
  wove(target) {

  }
}

export abstract class JointPoint {
  constructor(public precondition: Precondition) {}
  abstract wove(descriptor: any, advice: Advice): void;
  abstract match(descriptor: any): any[];
  _getMetadata(className: string, key: string, args: IArguments): Metadata {
    var invocation: MethodMetadata = {
      name: key,
      args: undefined,
      proceed: true,
      context: this,
      result: undefined
    };
    var metadata: Metadata = new Metadata();
    metadata.method = invocation;
    metadata.className = className;
    if (args[0] && args[0].__advice_metadata__) {
      let previousMetadata = <Metadata>args[0];
      metadata.method.result = previousMetadata.method.result;
      metadata.method.proceed = previousMetadata.method.proceed;
      metadata.method.args = previousMetadata.method.args;
      metadata.method.context = previousMetadata.method.context;
    } else {
      metadata.method.args = Array.prototype.slice.call(args);
    }
    return metadata;
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
    console.log('Woving', key);
    let className = proto.constructor.name;
    let bak = proto[key];
    let self = this;
    proto[key] = function () {
      let metadata = self._getMetadata(className, key, arguments);
      advice.wove(bak);
    };
  }
  match(target): any[] {
    let name = target.name;
    let keys = Object.getOwnPropertyNames(target.prototype);
    console.log('Trying to match', name, 'against MethodCallJointPoint with precondition');
    let res = keys.map(key => {
      if (this.precondition.assert({ className: name, methodName: key })) {
        return key;
      }
      return false;
    }).filter(val => !!val);
    if (res) {
      console.log('Matched!', res);
    }
    return res;
  }
}

function makeClassDecorator() {
  throw new Error('Not implemented');
}

function makeMethodDecorator(constr) {
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

function makePropertyDecorator() {
  throw new Error('Not implemented');
}

let before = makeMethodDecorator(BeforeAdvice);
let after = makeMethodDecorator(AfterAdvice);

class LoggerAspect {
  @before({ classNamePattern: /^Article/, methodNamePattern: /^get/ })
  logBefore() {
    console.log('Invoke logBefore with', arguments);
  }
}

@Wove()
class Article {
  getArticle() {
    console.log('Inside getArticle');
  }
}

let article = new Article();
article.getArticle();
