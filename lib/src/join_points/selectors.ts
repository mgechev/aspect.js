export type MethodDecoratorFactory = (...args: any[]) => MethodDecorator;

export interface MethodSelector {
  classNamePattern?: RegExp;
  methodNamePattern?: RegExp;
  classes?: Function[];
  methods?: Function[];
  decorators?: (MethodDecorator | MethodDecoratorFactory)[];
}

export type PropertyDecoratorFactory = (...args: any[]) => PropertyDecorator;

export interface PropertySelector {
  classNamePattern?: RegExp;
  propertyNamePattern?: RegExp;
  classes?: Function[];
  properties?: PropertyDescriptor[];
  decorators?: (MethodDecorator | MethodDecoratorFactory)[];
}
