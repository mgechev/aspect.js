import { aroundMethod, Metadata } from '../lib/index';

export default class ExternalAspect {
  @aroundMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
  around(metadata: Metadata) {
    console.assert(metadata.className === 'Demo');
    console.assert(metadata.method.name === 'get');

    metadata.method.proceed = false;
    metadata.method.result = 'ExternalAspect';

    console.log('aspect');
  }
}
