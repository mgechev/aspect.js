export type MethodDecoratorFactory = (...args: any[]) => MethodDecorator;

export interface MethodSelector {
  classNamePattern?: RegExp;
  methodNamePattern?: RegExp;
  classes?: Function[];
  methods?: Function[];
  decorators?: (MethodDecorator | MethodDecoratorFactory)[];
}

export type PropertyDecoratorFactory = (...args: any[]) => PropertyDecorator;

export interface MemberSelector {
  classNamePattern?: RegExp;
  fieldNamePattern?: RegExp;
  classes?: Function[];
  fields?: PropertyDescriptor[];
  decorators?: (PropertyDecorator | PropertyDecoratorFactory)[];
}
