import { Wove, resetRegistry, Metadata } from "../../lib/src/core";

import { expect } from "chai";
import { aroundMethod } from "../../lib";

describe("around advices", () => {
  afterEach(() => {
    resetRegistry();
  });

  it("should only get invoked once when using MethodMetadata.complete()", () => {
    let count = 0;

    class Aspect {
      @aroundMethod({ classNamePattern: /^Test/, methodNamePattern: /^get$/ })
      aroundMethod(meta: Metadata) {
        return meta.method.complete(...meta.method.args) + " appended from the aspect";
      }
    }

    @Wove()
    class Test {
      get(it: string): string {
        count++;
        return it;
      }
    }

    const test = new Test();
    expect(test.get("test")).to.equal("test appended from the aspect");
    expect(count).to.equal(1);
  });
});
