import 'reflect-metadata';
import { Precondition } from '../core/join_point';
import { MethodSelector, PropertySelector } from './selectors';
import { weave } from '../core/advised';

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

    const matchClass =
      (!s.classNamePattern && !s.classes) ||
      (s.classNamePattern && s.classNamePattern.test(className)) ||
      (s.classes && s.classes.some(c => c === classDefinition));

    let matchMethod = false;
    if (s.methodNamePattern || s.methods) {
      matchMethod = !!(
        (s.methodNamePattern && s.methodNamePattern.test(methodName)) ||
        (s.methods && s.methods.some(m => classDefinition.prototype[methodName] === m))
      );
    }

    let matchDecorator = false;
    if (s.decorators) {
      const d = Object.getOwnPropertyDescriptor(classDefinition.prototype, methodName);
      matchDecorator = s.decorators.some(decorator => {
        return !d.get && !d.set && Reflect.hasMetadata(decorator, classDefinition.prototype, methodName);
      });
    }

    return matchDecorator || (matchClass && matchMethod);
  }
}

export class MemberPrecondition implements Precondition {
  constructor(private selector: PropertySelector) {}

  assert({ classDefinition, fieldName }: { classDefinition: any; fieldName: string }): boolean {
    const s = this.selector;
    const className = classDefinition.name;

    const matchClass =
      (!s.classNamePattern && !s.classes) ||
      (s.classNamePattern && s.classNamePattern.test(className)) ||
      (s.classes && s.classes.some(c => c === classDefinition));

    let matchField = false;
    const d = Object.getOwnPropertyDescriptor(classDefinition.prototype, fieldName);
    if (s.propertyNamePattern || s.properties) {
      matchField = !!(
        (s.propertyNamePattern && s.propertyNamePattern.test(fieldName)) ||
        (s.properties &&
          s.properties.some(f => {
            if (!f) {
              throw new Error(
                'Got invalid property descriptor for a member selector. Use Object.getOwnPropertyDescriptor(fn.prototype, name) if you are using field selectors.'
              );
            }
            return d && (d.get === f.get && d.set === f.set);
          }))
      );
    }

    let matchDecorator = false;
    if (s.decorators) {
      matchDecorator = s.decorators.some(decorator => {
        return (d.get || d.set) && Reflect.hasMetadata(decorator, classDefinition.prototype, fieldName);
      });
    }

    return matchDecorator || (matchClass && matchField);
  }
}
