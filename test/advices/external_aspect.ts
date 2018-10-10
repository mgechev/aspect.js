import { aroundMethod, Metadata } from "../../lib";
import { expect } from "chai";

export default class ExternalAspect {
  @aroundMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
  around(metadata: Metadata) {
    expect(this).to.deep.equal(ExternalAspect.prototype);
    expect(metadata.className).to.equal('Demo');
    expect(metadata.method.name).to.equal('get');
    expect(metadata.method.args).to.deep.equal([42, 1.618]);
    expect(metadata.method.invoke).to.be.a('function');

    metadata.method.proceed = false
    metadata.method.result = 'ExternalAspect'
  }
}
