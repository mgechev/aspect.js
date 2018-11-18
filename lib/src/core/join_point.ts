import { Advice } from './advice';
import { Metadata, MethodMetadata } from './metadata';

export interface Precondition {
  assert(data: any): boolean;
}

export abstract class JoinPoint {
  constructor(public precondition: Precondition) {}

  public abstract match(descriptor: Function): string[];

  protected abstract getTarget(fn: Function): Object;

  protected abstract wrapTarget(target: Object, match: string, advice: Advice, advisedMetadata: any): void;

  public apply(
    { fn, matches, advisedMetadata }: { fn: Function; matches: string[]; advisedMetadata: any },
    advice: Advice
  ): void {
    const target = this.getTarget(fn);
    matches.forEach((match: string) => {
      this.wrapTarget(target, match, advice, advisedMetadata);
    });
  }

  protected getMetadata(
    className: string,
    key: string,
    fn: Function,
    args: IArguments,
    context: any,
    advisedMetadata: any
  ): Metadata {
    const boundFn = fn.bind(context);

    var invocation: MethodMetadata = {
      name: key,
      proceed: true,
      context: context,
      result: undefined,
      exception: undefined,
      args: undefined,
      invoke: boundFn,
      complete: function complete(...args: any[]): any {
        this.method.proceed = false;
        return boundFn.apply(null, args);
      }
    };

    var metadata: Metadata = new Metadata();
    metadata.method = invocation;
    metadata.className = className;
    metadata.advisedMetadata = advisedMetadata;
    if (args[0] && args[0].__advice_metadata__) {
      let previousMetadata = <Metadata>args[0];
      metadata.method.result = previousMetadata.method.result;
      metadata.method.proceed = previousMetadata.method.proceed;
      metadata.method.args = previousMetadata.method.args;
      metadata.method.context = previousMetadata.method.context;
    } else {
      metadata.method.args = Array.prototype.slice.call(args);
      metadata.method.complete = metadata.method.complete.bind(metadata);
    }
    return metadata;
  }
}

/**
 * Kept for backward compability only.
 * Use {@link JoinPoint} instead.
 *
 * @deprecated renamed to JoinPoint
 * @see JoinPoint
 */
export abstract class JointPoint extends JoinPoint {
  constructor(public precondition: Precondition) {
    super(precondition);
  }
}
