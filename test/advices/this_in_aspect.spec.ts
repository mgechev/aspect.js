import { Wove, resetRegistry, Metadata } from "../../lib/src/core";

import { expect } from "chai";
import { aroundMethod } from "../../lib";

describe("sync advices", () => {
  afterEach(() => {
    resetRegistry();
  });

  describe("the \"this\" in an aspect", () => {
    it("should be bound correctly", () => {
      const bar = "bar";

      class AspectWithThis {
        foo: string;

        constructor() {
          this.foo = bar;
        }

        @aroundMethod({ classNamePattern: /^Test$/, methodNamePattern: /^appendX$/ })
        aroundMethod(meta: Metadata) {
          if (meta.method.proceed) {
            meta.method.proceed = false;
            meta.method.result = this.foo;
          }
        }
      }

      @Wove()
      class Test {
        appendX(it: string) {
          return `${it}x`;
        }
      }

      const test = new Test();
      expect(test.appendX("it")).to.equal(bar); // instead of "itx"
    });
  });
});
