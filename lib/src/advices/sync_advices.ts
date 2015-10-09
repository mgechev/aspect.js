import {Advice} from '../core/advice';
import {Metadata} from '../core/metadata';

export class BeforeAdvice extends Advice {
  wove(target: any, metadata: Metadata) {
    this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
    this.invoke(target, metadata);
    return metadata.method.result;
  }
}

export class AfterAdvice extends Advice {
  wove(target: any, metadata: Metadata) {
    this.invoke(target, metadata);
    return this.advice.bind(this.context, metadata).apply(null, metadata.method.args) || metadata.method.result;
  }
}

export class AroundAdvice extends Advice {
  wove(target: any, metadata: Metadata) {
    this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
    this.invoke(target, metadata);
    return this.advice.bind(this.context, metadata).apply(null, metadata.method.args) || metadata.method.result;
  }
}
