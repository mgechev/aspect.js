import {Metadata} from './metadata';

export abstract class Advice {
  constructor(public context: Object, public advice: Function) {}
  abstract wove(context: any, target: Function, metadata: Metadata);
  invoke(context: any, target: any, metadata: Metadata) {
    if (target.__woven__) {
      metadata.method.result = target.apply(metadata.method.context, metadata.method.args);
    } else {
      if (metadata.method.proceed) {
        target.bind(context, metadata).apply(null, metadata.method.args);
      } else {
        return metadata.method.result;
      }
    }
  }
}
