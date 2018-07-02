import 'reflect-metadata';
import { Precondition } from '../core/join_point';
import { MethodSelector, MemberSelector } from './selectors';
import { weave } from '../core/weave';

export class MethodPrecondition implements Precondition {
  constructor(private selector: MethodSelector) {
    // Automatically weave classes
    const classes = selector.classes || [];
    for (const c of classes) {
      weave(c);
    }
  }

  assert({ classDefinition, methodName }: { classDefinition: any; methodName: string }): boolean {
    const s = this.selector;
    const className = classDefinition.name;

    const matchClass: boolean =
      (s.classNamePattern != null && s.classNamePattern.test(className)) ||
      (s.classes != null && s.classes.some(c => c === classDefinition));

    let matchMethod: boolean = false;
    if (s.methodNamePattern || s.methods) {
      matchMethod =
        (s.methodNamePattern != null && s.methodNamePattern.test(methodName)) ||
        (s.methods != null && s.methods.some(m => classDefinition.prototype[methodName] === m));
    }

    let matchDecorator = false;
    if (s.decorators) {
      const descriptor = Object.getOwnPropertyDescriptor(classDefinition.prototype, methodName);
      matchDecorator = s.decorators.some(decorator => {
        const isNotMember = descriptor != null ? !descriptor.get && !descriptor.set : false;
        const hasDecorator = Reflect.hasMetadata(decorator, classDefinition.prototype, methodName);
        return isNotMember && hasDecorator;
      });
    }

    return matchDecorator || (matchClass && matchMethod);
  }
}

export class MemberPrecondition implements Precondition {
  constructor(private selector: MemberSelector) {}

  assert({ classDefinition, fieldName }: { classDefinition: any; fieldName: string }): boolean {
    const selector = this.selector;
    const className = classDefinition.name;

    const matchClass: boolean =
      (selector.classNamePattern != null && selector.classNamePattern.test(className)) ||
      (selector.classes != null && selector.classes.some(c => c === classDefinition));

    let matchField: boolean = false;
    const descriptor = Object.getOwnPropertyDescriptor(classDefinition.prototype, fieldName);
    if (selector.fieldNamePattern || selector.fields) {
      const fieldNamePatternMatches: boolean =
        selector.fieldNamePattern != null && selector.fieldNamePattern.test(fieldName);
      matchField = !!(
        fieldNamePatternMatches ||
        (selector.fields &&
          selector.fields.some(field => {
            if (field == null) {
              throw new Error(
                'Got invalid property descriptor for a member selector. Use Object.getOwnPropertyDescriptor(fn.prototype, name) if you are using field selectors.'
              );
            }
            const fieldMatchesDescriptor: boolean =
              descriptor != null ? descriptor.get === field.get && descriptor.set === field.set : false;
            return fieldMatchesDescriptor;
          }))
      );
    }

    let matchDecorator: boolean = false;
    if (selector.decorators) {
      matchDecorator = selector.decorators.some(decorator => {
        const isMember = descriptor != null ? descriptor.get != null || descriptor.get != null : false;
        const hasDecorator = Reflect.hasMetadata(decorator, classDefinition.prototype, fieldName);
        return isMember && hasDecorator;
      });
    }

    return matchDecorator || (matchClass && matchField);
  }
}
