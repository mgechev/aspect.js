export interface MethodSelector {
  classNamePattern?: RegExp;
  methodNamePattern?: RegExp;
  classes?: Function[];
  methods?: Function[];
}

export interface MemberSelector {
  classNamePattern?: RegExp;
  fieldNamePattern?: RegExp;
  classes?: Function[];
  fields?: PropertyDescriptor[];
}
