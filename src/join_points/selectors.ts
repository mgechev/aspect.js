export type MethodDecoratorFactory = (...args: any[]) => MethodDecorator;
export type PropertyDecoratorFactory = (...args: any[]) => PropertyDecorator;
export type DecoratorKey = string | symbol | MethodDecorator | MethodDecoratorFactory;

export interface MethodSelector {
  classNamePattern?: RegExp;
  methodNamePattern?: RegExp;
  classes?: Function[];
  methods?: Function[];
  decorators?: DecoratorKey[];
}

export interface MemberSelector {
  classNamePattern?: RegExp;
  fieldNamePattern?: RegExp;
  classes?: Function[];
  fields?: PropertyDescriptor[];
  decorators?: DecoratorKey[];
}
