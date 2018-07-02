import { Advice } from '../core/advice';
import { Metadata } from '../core/metadata';

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
    return (metadata.method.result = this.advice.bind(this.context, metadata).apply(null, metadata.method.args));
  }
}

export class OnThrowAdvice extends Advice {
  wove(target: Function, metadata: Metadata) {
    try {
      const result = this.invoke(target, metadata);
      if (result instanceof Promise) {
      }
    } catch (e) {
      metadata.method.exception = e;
      this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
    }
    return metadata.method.result;
  }
}
