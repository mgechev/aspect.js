/// <reference path="../../typings/tsd.d.ts"/>

import {Metadata, MethodMetadata, Wove, resetRegistry} from '../../lib/src/core';
import {Advice} from '../../lib/src/core/advice';
import * as SyncAdvices from '../../lib/src/advices';

import {before, after, around, onThrow} from '../../lib/aspect';

import {expect} from 'chai';

describe('sync advices', () => {
  describe('BeforeAdvice', () => {
    beforeEach(() => {
      resetRegistry();
    });

    it('should invoke the advice with the appropriate metadata', (done) => {
      let demo;
      class Aspect {
        @before({ classNamePattern: /.*/, methodNamePattern: /.*/ })
        before(metadata: Metadata) {
          expect(this).to.deep.equal(Aspect.prototype);
          expect(metadata.method.context).to.eq(demo);
          expect(metadata.className).to.equal('Demo');
          expect(metadata.method.name).to.equal('get');
          expect(metadata.method.args).to.deep.equal([42, 1.618]);
          done();
        }
      }
      @Wove()
      class Demo {
        get(foo, bar) {}
      }

      demo = new Demo();
      demo.get(42, 1.618);
    });

    it('should invoke the advice before the target', (done) => {
      let adviceCalled = false;
      let methodCalled = false;
      class Aspect {
        @before({ classNamePattern: /.*/, methodNamePattern: /.*/ })
        before(metadata: Metadata) {
          adviceCalled = true;
          expect(methodCalled).to.equal(false);
        }
      }
      @Wove()
      class Demo {
        get() {
          methodCalled = true;
          expect(adviceCalled).to.equal(true);
          done();
        }
      }
      new Demo().get();
    });

  });
});