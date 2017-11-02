import {
  Metadata,
  MethodMetadata,
  Wove,
  resetRegistry
} from '../../lib/src/core';
import { Advice } from '../../lib/src/core/advice';
import * as SyncAdvices from '../../lib/src/advices';

import {
  beforeMethod,
  beforeStaticMethod,
  beforeGetter,
  beforeSetter,
  afterMethod
} from '../../lib/index';

import { expect } from 'chai';

describe('sync advices', () => {
  beforeEach(() => {
    resetRegistry();
  });
  describe('BeforeAdvice', () => {
    // beforeEach(() => {
    //   resetRegistry();
    // });

    it('should invoke the advice with the appropriate metadata', done => {
      let demo: any;
      class Aspect {
        @beforeMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
        before(metadata: Metadata) {
          expect(this).to.deep.equal(Aspect.prototype);
          expect(metadata.method.context).to.eq(demo);
          expect(metadata.className).to.equal('Demo');
          expect(metadata.method.name).to.equal('get');
          expect(metadata.method.args).to.deep.equal([42, 1.618]);
          expect(metadata.method.invoke).to.be.a('function');
          done();
        }
      }
      @Wove()
      class Demo {
        get(foo: any, bar: any) {}
      }

      demo = new Demo();
      demo.get(42, 1.618);
    });

    it('should invoke the advice before the target', done => {
      let adviceCalled = false;
      let methodCalled = false;
      class Aspect {
        @beforeMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
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

    it('should be able to invoke the method manually', done => {
      let demo;
      let called = 0;
      class Aspect {
        @beforeMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
        before(metadata: Metadata) {
          metadata.method.proceed = false;
          metadata.method.result = metadata.method.invoke(
            ...metadata.method.args
          );
          expect(metadata.method.result).to.be.equal(6);
        }
      }
      @Wove()
      class Demo {
        multiplier = 2;
        get(foo: any, bar: any) {
          called++;
          return (foo + bar) * this.multiplier;
        }
      }

      demo = new Demo();
      expect(demo.get(1, 2)).to.be.equal(6);
      expect(called).to.be.equal(1);
      done();
    });

    it('should be able to invoke the static method manually', done => {
      let called = 0;
      class Aspect {
        @beforeStaticMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
        before(metadata: Metadata) {
          metadata.method.proceed = false;
          metadata.method.result = metadata.method.invoke(
            ...metadata.method.args
          );
          expect(metadata.method.result).to.be.equal(3);
        }
      }
      @Wove()
      class Demo {
        static get(foo: number, bar: number) {
          called++;
          return foo + bar;
        }
      }

      expect(Demo.get(1, 2)).to.be.equal(3);
      expect(called).to.be.equal(1);
      done();
    });

    it('should be able to invoke the static method manually with custom arguments', done => {
      let called = 0;
      class Aspect {
        @beforeStaticMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
        before(metadata: Metadata) {
          metadata.method.proceed = false;
          metadata.method.result = metadata.method.invoke(2, 3);
          expect(metadata.method.result).to.be.equal(5);
        }
      }
      @Wove()
      class Demo {
        static get(foo: number, bar: number) {
          called++;
          return foo + bar;
        }
      }

      expect(Demo.get(1, 2)).to.be.equal(5);
      expect(called).to.be.equal(1);
      done();
    });

    it('should be able to invoke the getter manually', done => {
      let demo;
      let called = 0;
      class Aspect {
        @beforeGetter({ classNamePattern: /.*/, fieldNamePattern: /.*/ })
        before(metadata: Metadata) {
          metadata.method.proceed = false;
          const result = metadata.method.invoke(metadata.method.args);
          metadata.method.result = result * 2;
          expect(result).to.be.equal(5);
        }
      }
      @Wove()
      class Demo {
        get foo() {
          called++;
          return 5;
        }
      }

      demo = new Demo();

      expect(demo.foo).to.be.equal(10);
      expect(called).to.be.equal(1);
      done();
    });

    it('should be able to invoke the setter manually', done => {
      let demo;
      let called = 0;
      class Aspect {
        @beforeSetter({ classNamePattern: /.*/, fieldNamePattern: /.*/ })
        before(metadata: Metadata) {
          metadata.method.proceed = false;
          metadata.method.invoke('rainbow');
        }
      }
      @Wove()
      class Demo {
        private fooValue: any;

        set foo(value: any) {
          called++;
          this.fooValue = value;
        }

        get foo() {
          return this.fooValue;
        }
      }

      demo = new Demo();
      demo.foo = 'bar';

      expect(demo.foo).to.be.equal('rainbow');
      expect(called).to.be.equal(1);
      done();
    });
  });

  describe('AfterAdvice', () => {
    it('should invoke the advice with the appropriate metadata', done => {
      let demo: any;
      class Aspect {
        @afterMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
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
        get(foo: number, bar: number) {}
      }

      demo = new Demo();
      demo.get(42, 1.618);
    });

    it('should invoke the advice after the target', done => {
      let adviceCalled = false;
      let methodCalled = false;
      class Aspect {
        @afterMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
        before(metadata: Metadata) {
          adviceCalled = true;
          expect(methodCalled).to.equal(true);
        }
      }
      @Wove()
      class Demo {
        get() {
          methodCalled = true;
          expect(adviceCalled).to.equal(false);
          done();
        }
      }
      new Demo().get();
    });

    it('should not invoke the same advice twice', () => {
      let adviceCalls = 0;
      let methodCalled = false;

      @Wove()
      class Demo {
        get() {}
        set() {}
      }

      class Aspect {
        @beforeMethod({ classNamePattern: /Demo/, methodNamePattern: /get/ })
        before(metadata: Metadata) {
          adviceCalls += 1;
        }
        @afterMethod({ classNamePattern: /Demo/, methodNamePattern: /set/ })
        after(metadata: Metadata) {}
      }
      new Demo().get();
      expect(adviceCalls).to.eq(1);
    });
  });

  describe('Wove', () => {
    it('should pass the Wove config as `woveMetadata`', () => {
      let adviceCalls = 0;

      @Wove({ foo: 'bar' })
      class Demo {
        get() {}
        set() {}
      }

      class Aspect {
        @beforeMethod({ classes: [Demo], methodNamePattern: /get/ })
        before(metadata: Metadata) {
          expect(metadata.woveMetadata).to.deep.equal({ foo: 'bar' });
          adviceCalls += 1;
        }
      }
      const demo = new Demo();
      demo.get();
      expect(adviceCalls).to.eq(1);
    });

    it('should weave automatically when using classes', () => {
      let adviceCalls = 0;

      class Demo {
        get() {}
        set() {}
      }

      class Aspect {
        @beforeMethod({ classes: [Demo], methodNamePattern: /get/ })
        before(metadata: Metadata) {
          adviceCalls += 1;
        }
        @afterMethod({ classes: [Demo], methodNamePattern: /set/ })
        after(metadata: Metadata) {
          adviceCalls += 1;
        }
      }
      const demo = new Demo();
      demo.get();
      expect(adviceCalls).to.eq(1);
      demo.set();
      expect(adviceCalls).to.eq(2);
    });
  });
});
