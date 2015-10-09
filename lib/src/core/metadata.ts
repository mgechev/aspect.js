export class MethodMetadata {
  public proceed: boolean;
  public name: string;
  public args: any[];
  public context: any;
  public result: any;
}

export class Metadata {
  public method: MethodMetadata;
  public className: string;
  private __advice_metadata__ = true;
}
