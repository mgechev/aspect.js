/// <reference path="../../typings/tsd.d.ts"/>

import {Pointcut, Precondition, JointPoint, Advice} from '../../lib/src/core';

import {expect} from 'chai';

class SimpleJP extends JointPoint {
  match(descriptor): any[] {
    if (this.precondition.assert(descriptor)) {
      return [1];
    }
    return [];
  }
  getTarget(fn: any): any {
    return '42';
  }
  woveTarget(fn: any, match: any, advice: Advice): void {

  }
  wove() {}
}

class SimplePrecondition implements Precondition {
  assert(data:any): boolean {
    return true;
  }
}

// TODO(mgechev) refactor with spies
describe('Pointcut', () => {
  let pc: Pointcut;
  let jp1: JointPoint;
  let jp2: JointPoint;
  beforeEach(() => {
    pc = new Pointcut();
    jp1 = new SimpleJP(new SimplePrecondition());
    jp1.precondition = new SimplePrecondition();

    jp2 = new SimpleJP(new SimplePrecondition());
    jp2.precondition = new SimplePrecondition();
    pc.jointPoints = [jp1, jp2];
  });
  it('Match should be invoked', (done) => {
    let bak = jp1.match;
    let called1 = false;
    jp1.match = function (d): any[] {
      bak.call(this, d);
      called1 = true;
      return [];
    };
    let bak2 = jp1.match;
    let called2 = false;
    jp2.match = function (d): any[] {
      bak2.call(this, d);
      called2 = true;
      return [];
    };
    pc.apply({});
    expect(called1).to.equal(true);
    expect(called2).to.equal(true);
    done();
  });
});
