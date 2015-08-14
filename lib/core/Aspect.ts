import Advice from './Advice';
import AspectCollection from './AspectCollection';

class Aspect {
  constructor(
    public advice:Advice,
    public apply:any,
    public pointcut:Pointcut
  ) {}
}

class Pointcut {
  constructor(
    public classPattern:RegExp,
    public methodPattern:RegExp
  ) {}
}

let aspectFactory = (when:string, apply:{(proto:any, p:any, name:string):void}) => {
  return (classPattern, methodPattern) => {
    return (target, key, descriptor) => {
      let advice = new Advice(
        descriptor.value,
        when
      );
      let pointcut = new Pointcut(
        classPattern,
        methodPattern
      );
      AspectCollection.getInstance().register(new Aspect(
        advice,
        apply,
        pointcut
      ));
    };
  };
};

export { aspectFactory, Pointcut, Aspect };
