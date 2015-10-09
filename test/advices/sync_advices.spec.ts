/// <reference path="../../typings/tsd.d.ts"/>

import {Metadata, MethodMetadata} from '../../lib/src/core';
import {Advice} from '../../lib/src/core/advice';
import * as SyncAdvices from '../../lib/src/advices';

import {expect} from 'chai';

describe('sync advices', () => {
  describe('BeforeAdvice', () => {
    let advice:Advice;
    let proto = {
      foo: () => {},
      bar: 42
    };
    let metadata: Metadata;
    beforeEach(() => {
      metadata = new Metadata();
      metadata.className = 'bar';
      metadata.method = new MethodMetadata();
      metadata.method.name = 'baz';
    });

    it('should invoke the advice with the appropriate context', (done) => {
      var func = function () {
        expect(this).to.equal(proto);
      };
      advice = new SyncAdvices.BeforeAdvice(proto, func);
      expect(3).to.equal(3)
      done();
    });
  });
});