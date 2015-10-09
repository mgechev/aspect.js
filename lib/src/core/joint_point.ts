import {Advice} from './advice';
import {Metadata, MethodMetadata} from './metadata';

export interface Precondition {
  assert(data: any): boolean;
}

export abstract class JointPoint {
  constructor(public precondition: Precondition) {}
  abstract wove(descriptor: any, advice: Advice): void;
  abstract match(descriptor: any): any[];
  _getMetadata(className: string, key: string, args: IArguments): Metadata {
    var invocation: MethodMetadata = {
      name: key,
      args: undefined,
      proceed: true,
      context: this,
      result: undefined
    };
    var metadata: Metadata = new Metadata();
    metadata.method = invocation;
    metadata.className = className;
    if (args[0] && args[0].__advice_metadata__) {
      let previousMetadata = <Metadata>args[0];
      metadata.method.result = previousMetadata.method.result;
      metadata.method.proceed = previousMetadata.method.proceed;
      metadata.method.args = previousMetadata.method.args;
      metadata.method.context = previousMetadata.method.context;
    } else {
      metadata.method.args = Array.prototype.slice.call(args);
    }
    return metadata;
  }
}
