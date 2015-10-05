import Advice from './Advice';
declare class Aspect {
    advice: Advice;
    apply: any;
    pointcut: Pointcut;
    constructor(advice: Advice, apply: any, pointcut: Pointcut);
}
declare class Pointcut {
    classPattern: RegExp;
    methodPattern: RegExp;
    constructor(classPattern: RegExp, methodPattern: RegExp);
}
declare let aspectFactory: (when: string, apply: (proto: any, p: any, name: string) => void) => (classPattern: any, methodPattern: any) => (target: any, key: any, descriptor: any) => void;
export { aspectFactory, Pointcut, Aspect };
