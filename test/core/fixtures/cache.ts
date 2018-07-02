import 'reflect-metadata';
import { makeMethodDecorator } from '../../../src/core';

export const Cache = (key: string) => {
  return makeMethodDecorator((target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(Cache, { key }, target, propertyKey);
  });
};
