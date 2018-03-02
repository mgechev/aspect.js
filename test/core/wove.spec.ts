import { expect } from 'chai';
import { Metadata } from './../../lib/src/core/metadata';
import { beforeMethod } from './../../lib/index';
import { Wove } from './../../lib/src/core';

import { spy } from 'sinon';

@Wove()
@Wove()
class ClassA {
  foo() {}
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
  beforeEach(() => (methods.length = 0));

  it('should work with extended classes', () => {
    const fooSpy = spy(ClassA.prototype, 'foo');
    const barSpy = spy(ClassB.prototype, 'bar');
    const quxSpy = spy(ClassB.prototype, 'qux');

    new ClassB();

    expect(fooSpy.called).equal(true);
    expect(barSpy.called).equal(true);
    expect(quxSpy.called).equal(true);
    expect(methods).deep.eq(['foo', 'bar', 'qux']);
  });
});
