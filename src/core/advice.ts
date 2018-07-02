import { Metadata } from './metadata';

export abstract class Advice {
  constructor(public context: Object, public advice: Function) {}

  public abstract wove(target: Function, metadata: Metadata): void;

  public invoke(target: any, metadata: Metadata) {
    if (target.__woven__) {
      return (metadata.method.result = target.bind(this.context, metadata).apply(null, metadata.method.args));
    }

    metadata.method.result = target.apply(metadata.method.context, metadata.method.args);

    return metadata.method.result;
  }
}

export abstract class AsyncAdvice {
  constructor(public context: Object, public advice: Function) {}

  public abstract async wove<T>(target: Function, metadata: Metadata): Promise<T>;

  public async invoke(target: any, metadata: Metadata) {
    if (target.__woven__) {
      metadata.method.result = await target.bind(this.context, metadata).apply(null, metadata.method.args);
    }

    metadata.method.result = await target.apply(metadata.method.context, metadata.method.args);

    return metadata.method.result;
  }
}
