import { expect } from 'chai';
import { Metadata } from './../../lib/src/core/metadata';
import { beforeMethod } from './../../lib/index';
import { Advised } from './../../lib/src/core';

import { spy } from 'sinon';

const o = 42;

@Advised()
class ClassA {
  foo() {}

  overridden() {
    return o;
  }
}

@Advised()
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

const Log = (message: string) => {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(Log, { message }, target, propertyKey);
  };
};

@Advised()
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

describe('@Advised', () => {
  beforeEach(() => (methods.length = 0));

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

  it('should work with decorated classes', () => {
    const fooSpy = spy(console, 'log');

    const c = new ClassC();
    c.foo();

    expect(fooSpy.calledWith('Foo was called')).equal(true);
  });
});
