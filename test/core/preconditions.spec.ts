import { MemberSelector } from './../../lib/src/join_points/selectors';
import { MemberPrecondition } from './../../lib/src/join_points/preconditions';

import { expect } from 'chai';

describe('Preconditions', () => {
  describe('MemberPrecondition', () => {
    it('should match by regex', () => {
      class Foo {
        get bar(): any {
          return null;
        }
        get baz(): any {
          return null;
        }
        set foobar(v: any) {
          // empty
        }
      }

      const selector: MemberSelector = {
        classNamePattern: /Foo/,
        fieldNamePattern: /bar/
      };
      const p = new MemberPrecondition(selector);
      expect(p.assert({ classDefinition: Foo, fieldName: 'bar' })).equal(true);
      expect(p.assert({ classDefinition: Foo, fieldName: 'baz' })).equal(false);
    });

    it('should match by value', () => {
      class Foo {
        get bar(): any {
          return undefined;
        }
        get baz(): any {
          return null;
        }
        set foobar(v: any) {
          // empty
        }
      }

      const selector: MemberSelector = {
        classes: [Foo],
        fields: [Object.getOwnPropertyDescriptor(Foo.prototype, 'baz')]
      };
      const p = new MemberPrecondition(selector);
      // expect(p.assert({ classDefinition: Foo, fieldName: 'baz' })).equal(true);
      expect(p.assert({ classDefinition: Foo, fieldName: 'bar' })).equal(false);
    });

    it('should throw with invalid selector', () => {
      class Foo {
        get bar(): any {
          return null;
        }
        get baz(): any {
          return null;
        }
        set foobar(v: any) {
          // empty
        }
      }

      const selector: MemberSelector = {
        classes: [Foo],
        fields: [Foo.prototype.foobar]
      };
      const p = new MemberPrecondition(selector);
      expect(() => {
        p.assert({ classDefinition: Foo, fieldName: 'baz' });
      }).to.throw();
    });

    it('should match by value & regex', () => {
      class Foo {
        get bar(): any {
          return null;
        }
        get baz(): any {
          return null;
        }
        set foobar(v: any) {
          // empty
        }
      }

      const p1 = new MemberPrecondition({
        classNamePattern: /Foo/,
        fields: [Object.getOwnPropertyDescriptor(Foo.prototype, 'baz')]
      });
      expect(p1.assert({ classDefinition: Foo, fieldName: 'bar' })).equal(false);
      expect(p1.assert({ classDefinition: Foo, fieldName: 'baz' })).equal(true);

      const p2 = new MemberPrecondition({
        classes: [Foo],
        fieldNamePattern: /bar/
      });
      expect(p2.assert({ classDefinition: Foo, fieldName: 'bar' })).equal(true);
      expect(p2.assert({ classDefinition: Foo, fieldName: 'foobar' })).equal(true);
      expect(p2.assert({ classDefinition: Foo, fieldName: 'baz' })).equal(false);
    });
  });
});
