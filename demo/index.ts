import {
  Advised,
  Metadata,
  MethodMetadata,
  beforeMethod,
  afterMethod,
  beforeGetter,
  afterSetter,
  afterGetter,
  beforeStaticMethod
} from '../lib';

class CacheAspect {
  @beforeMethod({
    classNamePattern: /^(\w+Mapper|Http)$/,
    methodNamePattern: /^get/
  })
  @beforeStaticMethod({
    classNamePattern: /^(\w+Mapper|Http)$/,
    methodNamePattern: /^get/
  })
  before(meta: Metadata) {
    console.log(
      `Inside CacheAspect.before for ${meta.className}.${meta.method.name} with args ${meta.method.args.join(', ')}`
    );
  }
  @afterMethod({
    classNamePattern: /^(\w+Mapper|Http)$/,
    methodNamePattern: /^get/
  })
  @afterGetter({
    classNamePattern: /^(\w+Mapper|Http)$/,
    propertyNamePattern: /^get/
  })
  after(meta: Metadata) {
    console.log(
      `Inside CacheAspect.after for ${meta.className}.${meta.method.name} with args ${meta.method.args.join(', ')}`
    );
  }
}

// class LoggerAspect {
//   @after({ classNamePattern: /.*/, methodNamePattern: /^get/})
//   before(meta: Metadata) {
//     console.log(`Inside LoggerAspect.before for ${meta.className}.${meta.method.name} with args ${meta.method.args.join(', ')}`);
//   }
//   @after({ classNamePattern: /.*/, methodNamePattern: /^get/})
//   after(meta: Metadata) {
//     console.log(`Inside LoggerAspect.after for ${meta.className}.${meta.method.name} with args ${meta.method.args.join(', ')}`);
//   }
// }

@Advised()
class Http {
  get(url: string) {
    console.log(`Called Http.get with url = ${url}`);
  }
  post(url: string, data: any) {
    console.log(`Called Http.post with url = ${url}`);
  }
}

@Advised()
class UserMapper {
  constructor(private http: Http) {}
  get(id: number) {
    console.log(`Called UserMapper.get with id = ${id}`);
    this.http.get('http://foo.bar');
    return 'result';
  }
  foo() {
    console.log('bar');
  }
  get getfield() {
    this.foo();
    return 42;
  }
  static getUserMapper() {
    console.log('Inside getUserMapper');
    return 42;
  }
}

let mapper = new UserMapper(new Http());
// console.log(mapper.get(42));
console.log(mapper.getfield);
// console.log(UserMapper.getUserMapper())
