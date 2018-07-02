import { aroundMethod } from './../../../src';
import { Metadata } from './../../../src/core/metadata';
import { Cache } from './cache';

export class CacheAspect {
  @aroundMethod({
    decorators: [ Cache ],
  })
  cache(meta: Metadata) {
    const { method } = meta;
    const { key } = Reflect.getMetadata(Cache, meta.method.context, meta.method.name);
    console.log(`Before: ${key}`);
    const result = method.invoke(...method.args);
    console.log(`After: ${key}`);
    return result;
  }
}
