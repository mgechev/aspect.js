import { Advised, resetRegistry } from '../../lib/src/core';

import { expect } from 'chai';

import './external_aspect';

describe('sync advices', () => {
  afterEach(resetRegistry);

  describe('External AroundAdvice', () => {
    it('should invoke the external advice with the appropriate metadata', () => {
      let demo: any;

      @Advised()
      class ExternalAspectDemo {
        get(_: any, __: any): string {
          return 'ExternalAspectDemo';
        }
      }

      demo = new ExternalAspectDemo();
      expect(demo.get(42, 1.618)).to.equal('ExternalAspect');
    });
  });
});
