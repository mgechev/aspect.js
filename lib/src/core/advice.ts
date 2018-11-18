import { Metadata } from './metadata';

export abstract class Advice {
  constructor(public context: Object, public advice: Function) {}

  public abstract apply(target: Function, metadata: Metadata): void;

  public invoke(target: any, metadata: Metadata) {
    if (target.__woven__) {
      return (metadata.method.result = target.bind(this.context, metadata).apply(null, metadata.method.args));
    }

    if (metadata.method.proceed) {
      return (metadata.method.result = target.apply(metadata.method.context, metadata.method.args));
    }

    return metadata.method.result;
  }
}

export abstract class AsyncAdvice {
  constructor(public context: Object, public advice: Function) {}

  public abstract async apply<T>(target: Function, metadata: Metadata): Promise<T>;

  public async invoke(target: any, metadata: Metadata) {
    if (target.__woven__) {
      metadata.method.result = await target.bind(this.context, metadata).apply(null, metadata.method.args);
    } else if (metadata.method.proceed) {
      metadata.method.result = await target.apply(metadata.method.context, metadata.method.args);
    }

    return metadata.method.result;
  }
}
