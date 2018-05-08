export class MethodMetadata {
  public name: string;
  public args: any[];
  public context: any;
  public result: any;
  public exception: any;
  public invoke: (...args: any[]) => any;
}

export class Metadata {
  public method: MethodMetadata;
  public woveMetadata: any;
  public className: string;
  private __advice_metadata__ = true;
}
