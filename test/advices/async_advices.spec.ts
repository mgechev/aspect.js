import { Metadata, MethodMetadata, Wove, resetRegistry } from '../../lib/core';
import { Advice } from '../../lib/core/advice';
import * as SyncAdvices from '../../lib/advices';

import { afterMethod, asyncOnThrowOfMethod, onThrowOfMethod, aroundMethod } from '../../lib/index';

import { expect } from 'chai';

@Wove()
class Target {
  async foo() {
    await new Promise(resolve => setTimeout(_ => resolve(42), 10));
    return 1.618;
  }

  async throwError() {
    await new Promise((_, reject) =>
      setTimeout(_ => {
        reject(42);
      }, 10)
    );
  }

  async directThrow() {
    throw 'Message';
  }
}

describe('async advices', () => {
  describe('AsyncAfterAdvice', () => {
    it('should work with async targets', async () => {
      let hasBeenCalled = false;

      class Advice {
        @afterMethod({ classNamePattern: /Target/, methodNamePattern: /foo/ })
        async after(data: Metadata) {
          hasBeenCalled = true;
          const res = await data.method.result;
          expect(res).to.eq(1.618);
        }
      }

      await new Target().foo();
      expect(hasBeenCalled).to.eq(true);
    });
  });

  describe('AsyncOnThrowAdvice', () => {
    it('should work with async targets', async () => {
      let hasBeenCalled = false;

      class Advice {
        @asyncOnThrowOfMethod({
          classNamePattern: /Target/,
          methodNamePattern: /throwError/,
        })
        throwError(data: Metadata) {
          hasBeenCalled = true;
          expect(data.method.exception).to.eq(42);
        }
      }

      const target = new Target();
      try {
        await target.throwError();
      } catch (e) {}
      expect(hasBeenCalled).to.eq(true);
    });

    it('should work with async targets', async () => {
      let hasBeenCalled = false;

      class Advice {
        @asyncOnThrowOfMethod({
          classNamePattern: /Target/,
          methodNamePattern: /directThrow/,
        })
        throwError(data: Metadata) {
          hasBeenCalled = true;
          expect(data.method.exception).to.eq('Message');
        }
      }

      const target = new Target();
      try {
        await target.directThrow();
      } catch (e) {}
      expect(hasBeenCalled).to.eq(true);
    });

    it('onThrowOfMethod should not work with async targets', async () => {
      let hasBeenCalled = false;

      class Advice {
        @onThrowOfMethod({
          classNamePattern: /Target/,
          methodNamePattern: /directThrow/,
        })
        throwError(data: Metadata) {
          hasBeenCalled = true;
        }
      }

      const target = new Target();
      try {
        await target.directThrow();
      } catch (e) {}
      expect(hasBeenCalled).to.eq(false);
    });
  });

  describe('AsyncAroundAdvice', () => {
    it('should work with async targets', async () => {
      let hasBeenCalled = false;

      class Advice {
        @aroundMethod({ classNamePattern: /Target/, methodNamePattern: /foo/ })
        async around(data: Metadata) {
          hasBeenCalled = true;
          return await data.method.invoke(...data.method.args);
        }
      }

      const result = await new Target().foo();
      expect(hasBeenCalled).to.eq(true);
      expect(result).to.eq(1.618);
    });
  });
});
