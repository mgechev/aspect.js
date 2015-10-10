import {Advice} from '../core/advice';
import {Metadata} from '../core/metadata';

export class BeforeAdvice extends Advice {
  wove(target: Function, metadata: Metadata) {
    this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
    this.invoke(target, metadata);
    return metadata.method.result;
  }
}

export class AfterAdvice extends Advice {
  wove(target: Function, metadata: Metadata) {
    this.invoke(target, metadata);
    this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
    return metadata.method.result;
  }
}

export class AroundAdvice extends Advice {
  wove(target: Function, metadata: Metadata) {
    this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
    this.invoke(target, metadata);
    this.advice.bind(this.context, metadata).apply(null, metadata.method.args)
    return metadata.method.result;
  }
}

export class OnThrowAdvice extends Advice {
  wove(target: Function, metadata: Metadata) {
    try {
      this.invoke(target, metadata);
    } catch (e) {
      this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
    }
    return metadata.method.result;
  }
}
