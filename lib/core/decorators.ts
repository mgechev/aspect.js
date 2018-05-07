import { weave } from './weave';

export function makeMethodDecorator(decorator: MethodDecorator): MethodDecorator {
  return <T>(target: Function, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    weave(target.constructor);
    return decorator(target, propertyKey, descriptor);
  };
}

export function makeMemberDecorator(decorator: PropertyDecorator) {
  return <T>(target: Function, propertyKey: string | symbol) => {
    weave(target.constructor);
    return decorator(target, propertyKey);
  };
}
