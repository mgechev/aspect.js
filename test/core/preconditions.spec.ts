import { expect } from 'chai';

import { MemberPrecondition, MemberSelector, MethodPrecondition } from './../../src/join_points';

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
        fieldNamePattern: /bar/,
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
        fields: [Object.getOwnPropertyDescriptor(Foo.prototype, 'baz')!],
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
        fields: [Foo.prototype.foobar],
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
        fields: [Object.getOwnPropertyDescriptor(Foo.prototype, 'baz')!],
      });
      expect(p1.assert({ classDefinition: Foo, fieldName: 'bar' })).equal(false);
      expect(p1.assert({ classDefinition: Foo, fieldName: 'baz' })).equal(true);

      const p2 = new MemberPrecondition({
        classes: [Foo],
        fieldNamePattern: /bar/,
      });
      expect(p2.assert({ classDefinition: Foo, fieldName: 'bar' })).equal(true);
      expect(p2.assert({ classDefinition: Foo, fieldName: 'foobar' })).equal(true);
      expect(p2.assert({ classDefinition: Foo, fieldName: 'baz' })).equal(false);
    });

    it('should match by decorator', () => {
      const Bar = (target: object, propertyKey: string | symbol) => {
        Reflect.defineMetadata(Bar, { propertyKey }, target, propertyKey);
      };

      const Baz = (parameter: string) => {
        return (target: object, propertyKey: string | symbol) => {
          Reflect.defineMetadata(Baz, { propertyKey }, target, propertyKey);
        };
      };

      const FooBar = (options: { value: string }) => {
        return (target: object, propertyKey: string | symbol) => {
          Reflect.defineMetadata(FooBar, { propertyKey, args: options }, target, propertyKey);
        };
      };

      class Foo {
        @Bar
        get bar(): any {
          return null;
        }

        @Baz('baz')
        get baz(): any {
          return null;
        }

        @FooBar({ value: 'value' })
        set foobar(v: any) {
          // empty
        }

        get nope(): any {
          return null;
        }
      }

      const p1 = new MemberPrecondition({
        classes: [Foo],
        fieldNamePattern: /bar/,
        decorators: [Bar, Baz, FooBar],
      });
      expect(p1.assert({ classDefinition: Foo, fieldName: 'bar' })).equal(true);
      expect(p1.assert({ classDefinition: Foo, fieldName: 'baz' })).equal(true);
      expect(p1.assert({ classDefinition: Foo, fieldName: 'foobar' })).equal(true);
      expect(p1.assert({ classDefinition: Foo, fieldName: 'nope' })).equal(false);
    });
  });

  describe('MethodPrecondition', () => {
    it('should match by decorator', () => {
      const Bar = (target: object, propertyKey: string | symbol) => {
        Reflect.defineMetadata(Bar, { propertyKey }, target, propertyKey);
      };

      const Baz = (parameter: string) => {
        return (target: object, propertyKey: string | symbol) => {
          Reflect.defineMetadata(Baz, { propertyKey }, target, propertyKey);
        };
      };

      const FooBar = (options: { value: string }) => {
        return (target: object, propertyKey: string | symbol) => {
          Reflect.defineMetadata(FooBar, { propertyKey, args: options }, target, propertyKey);
        };
      };

      class ClassA {
        yep(): any {
          return null;
        }
      }

      class Foo {
        @Bar
        get bar(): any {
          return null;
        }

        @Baz('baz')
        baz(): any {
          return null;
        }

        @FooBar({ value: 'value' })
        foobar(v: any) {
          // empty
        }

        nope(): any {
          return null;
        }

        yep(): any {
          return null;
        }
      }

      const p1 = new MethodPrecondition({
        classes: [ClassA, Foo],
        methodNamePattern: /yep/,
        decorators: [Bar, Baz],
      });
      expect(p1.assert({ classDefinition: Foo, methodName: 'bar' })).equal(false);
      expect(p1.assert({ classDefinition: Foo, methodName: 'baz' })).equal(true);
      expect(p1.assert({ classDefinition: Foo, methodName: 'foobar' })).equal(false);
      expect(p1.assert({ classDefinition: Foo, methodName: 'nope' })).equal(false);
      expect(p1.assert({ classDefinition: Foo, methodName: 'yep' })).equal(true);
      expect(p1.assert({ classDefinition: ClassA, methodName: 'yep' })).equal(true);
    });
  });
});
