import { Advice } from './advice';
import { Metadata, MethodMetadata } from './metadata';

export interface Precondition {
  assert(data: any): boolean;
}

export abstract class JointPoint {
  constructor(public precondition: Precondition) {}

  public abstract match(descriptor: Object): string[];

  protected abstract getTarget(fn: Function): Function;

  protected abstract woveTarget(
    fn: Function,
    match: string,
    advice: Advice,
    woveMetadata: any
  ): void;

  public wove(
    {
      fn,
      matches,
      woveMetadata
    }: { fn: Function; matches: any; woveMetadata: any },
    advice: Advice
  ): void {
    const target = this.getTarget(fn);
    matches.forEach((match: string) => {
      this.woveTarget(target, match, advice, woveMetadata);
    });
  }

  protected getMetadata(
    className: string,
    key: string,
    fn: any,
    args: IArguments,
    context: any,
    woveMetadata: any
  ): Metadata {
    var invocation: MethodMetadata = {
      name: key,
      proceed: true,
      context: context,
      result: undefined,
      exception: undefined,
      args: undefined,
      invoke: fn.bind(context)
    };
    var metadata: Metadata = new Metadata();
    metadata.method = invocation;
    metadata.className = className;
    metadata.woveMetadata = woveMetadata;
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
