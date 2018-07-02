import 'reflect-metadata';

export const Memoize = (key: string) => {
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(Memoize, key, descriptor.value);
  };
};
