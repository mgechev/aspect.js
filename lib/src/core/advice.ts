import {Metadata} from './metadata';

export abstract class Advice {
  constructor(public context: Object, public advice: Function) {}

  public abstract wove(target: Function, metadata: Metadata);

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

  public async abstract wove(target: Function, metadata: Metadata);

  public async invoke(target: any, metadata: Metadata) {
    if (target.__woven__) {
      metadata.method.result = await target.bind(this.context, metadata).apply(null, metadata.method.args);
    } else if (metadata.method.proceed) {
      metadata.method.result = await target.apply(metadata.method.context, metadata.method.args);
    }

    return metadata.method.result;
  }
}

