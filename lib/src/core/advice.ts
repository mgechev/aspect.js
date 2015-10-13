import {Metadata} from './metadata';

export abstract class Advice {
  constructor(public context: Object, public advice: Function) {}
  public abstract wove(target: Function, metadata: Metadata);
  public invoke(target: any, metadata: Metadata) {
    if (target.__woven__) {
      return (metadata.method.result = target.bind(this.context, metadata).apply(null, metadata.method.args));
    } else {
      if (metadata.method.proceed) {
        return (metadata.method.result = target.apply(metadata.method.context, metadata.method.args));
      } else {
        return metadata.method.result;
      }
    }
  }
}
