import { Advice } from './advice';
import { Metadata, MethodMetadata } from './metadata';

export interface Precondition {
  assert(data: any): boolean;
}

export abstract class JoinPoint {
  constructor(public precondition: Precondition) {}

  public abstract match(descriptor: Function): string[];

  protected abstract getTarget(fn: Function): Object;

  protected abstract woveTarget(target: Object, match: string, advice: Advice, woveMetadata: any): void;

  public wove(
    { fn, matches, woveMetadata }: { fn: Function; matches: string[]; woveMetadata: any },
    advice: Advice
  ): void {
    const target = this.getTarget(fn);
    matches.forEach((match: string) => {
      this.woveTarget(target, match, advice, woveMetadata);
    });
  }

  protected getMetadata(
    className: string,
    name: string,
    fn: Function,
    args: IArguments,
    context: any,
    woveMetadata: any
  ): Metadata {
    let method: MethodMetadata;
    if (args[0] && args[0].__advice_metadata__) {
      let previousMetadata = <Metadata>args[0];
      method = new MethodMetadata(
        name,
        previousMetadata.method.args,
        context,
        previousMetadata.method.result,
        previousMetadata.method.exception,
        fn.bind(context)
      );
    } else {
      method = new MethodMetadata(
        name,
        Array.prototype.slice.call(args),
        context,
        undefined,
        undefined,
        fn.bind(context)
      );
    }
    return new Metadata(method, woveMetadata, className);
  }
}
