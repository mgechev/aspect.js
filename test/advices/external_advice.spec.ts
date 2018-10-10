import {
  Wove,
  resetRegistry
} from '../../lib/src/core';

import { expect } from 'chai';

import './external_aspect'

describe('sync advices', () => {
  afterEach(() => {
    resetRegistry();
  });

  describe('External AroundAdvice', () => {
    it('should invoke the external advice with the appropriate metadata', () => {
      let demo: any;

      @Wove()
      class Demo {
        get(foo: any, bar: any): string { return 'Demo' }
      }

      demo = new Demo();
      expect(demo.get(42, 1.618)).to.equal('ExternalAspect');
    });
  });
});
