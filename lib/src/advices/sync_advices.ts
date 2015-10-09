import {Advice} from '../core/advice';
import {Metadata} from '../core/metadata';

export class BeforeAdvice extends Advice {
  wove(context: any, target: any, metadata: Metadata) {
    this.advice.bind(context, metadata).apply(null, metadata.method.args);
    this.invoke(context, target, metadata);
    return metadata.method.result;
  }
}

export class AfterAdvice extends Advice {
  wove(context: any, target: any, metadata: Metadata) {
    this.invoke(context, target, metadata);
    return this.advice.bind(context, metadata).apply(null, metadata.method.args) || metadata.method.result;
  }
}

export class AroundAdvice extends Advice {
  wove(context: any, target: any, metadata: Metadata) {
    this.advice.bind(context, metadata).apply(null, metadata.method.args);
    this.invoke(context, target, metadata);
    return this.advice.bind(context, metadata).apply(null, metadata.method.args) || metadata.method.result;
  }
}
