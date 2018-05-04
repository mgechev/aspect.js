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

const Log = (message: string) => {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(Log, { message }, target, propertyKey);
  };
};

@Wove()
class ClassC {
  @Log('Foo was called')
  foo() {}
}

class LoggerAspectC {
  @beforeMethod({
    decorators: [Log],
  })
  beforeLogger(meta: Metadata) {
    const { message } = Reflect.getMetadata(Log, meta.method.context, meta.method.name);
    console.log(message);
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

  it('should work with decorated classes', () => {
    const fooSpy = spy(console, 'log');

    const c = new ClassC();
    c.foo();

    expect(fooSpy.calledWith('Foo was called')).equal(true);
  });
});
