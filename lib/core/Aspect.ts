import Advice from './Advice';
import AspectCollection from './AspectCollection';
import {Metadata, MethodMetadata} from '../aspect/advices/metadata';

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

function aspectFactory(when:string, apply:{():Function}):any {
  return (classPattern, methodPattern) => {
    return (target, key, descriptor) => {
      let advice = new Advice(
        target,
        descriptor.value,
        when
      );
      let pointcut = new Pointcut(
        classPattern,
        methodPattern
      );
      AspectCollection.getInstance().register(new Aspect(
        advice,
        function (o, p, className) {
          var bak = o[p];
          var self = this;
          o[p] = function () {
            var invocation: MethodMetadata = {
              name: <string>p,
              args: undefined,
              proceed: true,
              context: this,
              result: undefined
            };
            var metadata: Metadata = new Metadata();
            metadata.method = invocation;
            metadata.className = className;
            if (arguments[0] && arguments[0].__advice_metadata__) {
              let previousMetadata = <Metadata>arguments[0];
              metadata.method.result = previousMetadata.method.result;
              metadata.method.proceed = previousMetadata.method.proceed;
              metadata.method.args = previousMetadata.method.args;
              metadata.method.context = previousMetadata.method.context;
            } else {
              metadata.method.args = Array.prototype.slice.call(arguments);
            }
            return apply().call(this, bak, self, metadata);
          };
          return o;
        },
        pointcut
      ));
    };
  };
}

export { aspectFactory, Pointcut, Aspect };

