export interface MethodSelector {
  classNamePattern?: RegExp;
  methodNamePattern?: RegExp;
  classes?: Function[];
  methods?: Function[];
}

export interface PropertySelector {
  classNamePattern?: RegExp;
  propertyNamePattern?: RegExp;
  classes?: Function[];
  properties?: PropertyDescriptor[];
}
