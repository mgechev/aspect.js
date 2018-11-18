import { AsyncAdvice } from '../core/advice';
import { Metadata } from '../core/metadata';

export class AsyncOnThrowAdvice extends AsyncAdvice {
  async apply(target: Function, metadata: Metadata) {
    try {
      await this.invoke(target, metadata);
    } catch (e) {
      metadata.method.exception = e;
      this.advice.bind(this.context, metadata).apply(null, metadata.method.args);
    }
    return metadata.method.result;
  }
}
