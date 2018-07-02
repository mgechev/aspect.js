export class MethodMetadata {
  constructor(
    public name: string,
    public args: any[],
    public context: any,
    public result: any,
    public exception: any,
    public invoke: (...args: any[]) => any
  ) {}
}

export class Metadata {
  private readonly __advice_metadata__ = true;

  constructor(public method: MethodMetadata, public woveMetadata: any, public className: string) {}
}
