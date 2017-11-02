export interface MethodSelector {
  classNamePattern?: RegExp;
  methodNamePattern?: RegExp;
  classes?: any[];
  methods?: any[];
}

export interface MemberSelector {
  classNamePattern: RegExp;
  fieldNamePattern: RegExp;
}
