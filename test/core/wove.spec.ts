import { expect } from 'chai';
import { Metadata } from './../../lib/src/core/metadata';
import { beforeMethod } from './../../lib/index';
import { Wove } from './../../lib/src/core';

import { spy } from 'sinon';

const o = 42;

@Wove()
class ClassA {
  foo() {}

  overridden() {
    return o;
  }
}

@Wove()
class ClassB extends ClassA {
  constructor() {
    super();
    this.foo();
    this.bar();
    this.qux();
  }

  bar() {}

  qux() {}

  overridden() {
    return super.overridden() + 1;
  }
}

const methods: string[] = [];

class LoggerAspect {
  @beforeMethod({
    methodNamePattern: /.*/,
    classNamePattern: /^ClassB|ClassA$/
  })
  beforeLogger(meta: Metadata) {
    methods.push(meta.method.name);
  }
}

describe('@Wove', () => {
  beforeEach(() => {
    methods.length = 0;
  });

  it('should work with subclasses', () => {
    const fooSpy = spy(ClassA.prototype, 'foo');
    const barSpy = spy(ClassB.prototype, 'bar');
    const quxSpy = spy(ClassB.prototype, 'qux');
    const overriddenSpyA = spy(ClassA.prototype, 'overridden');
    const overriddenSpyB = spy(ClassB.prototype, 'overridden');

    const b = new ClassB();

    expect(fooSpy.called).to.be.true;
    expect(barSpy.called).to.be.true;
    expect(quxSpy.called).to.be.true;
    expect(methods).to.deep.equal(['foo', 'bar', 'qux']);

    expect(b.overridden()).to.equal(o + 1);
    expect(overriddenSpyA.called).to.be.true;
    expect(overriddenSpyB.called).to.be.true;
  });
});
