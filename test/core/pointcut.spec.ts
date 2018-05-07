import { expect } from 'chai';

import { Advice, JoinPoint, Pointcut, Precondition } from '../../lib/core';
import { spy } from 'sinon';

class SimpleJP extends JoinPoint {
  match(descriptor: Object): string[] {
    if (this.precondition.assert(descriptor)) {
      return ['1'];
    }
    return [];
  }
  getTarget(fn: any): any {
    return '42';
  }
  woveTarget(fn: any, match: any, advice: Advice): void {}
  wove() {}
}

class SimplePrecondition implements Precondition {
  assert(data: any): boolean {
    return true;
  }
}

describe('Pointcut', () => {
  let pc: Pointcut;
  let jp1: JoinPoint;
  let jp2: JoinPoint;

  beforeEach(() => {
    pc = new Pointcut();
    jp1 = new SimpleJP(new SimplePrecondition());
    jp1.precondition = new SimplePrecondition();

    jp2 = new SimpleJP(new SimplePrecondition());
    jp2.precondition = new SimplePrecondition();
    pc.joinPoints = [jp1, jp2];
  });

  it('Match should be invoked', () => {
    const match1Spy = spy(jp1, 'match');
    const match2Spy = spy(jp2, 'match');
    pc.apply(function() {}, null);
    expect(match1Spy.called).to.equal(true);
    expect(match2Spy.called).to.equal(true);
  });
});
