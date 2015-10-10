import {Wove, Metadata, MethodMetadata, beforeMethod, afterMethod, beforeGetter, afterSetter, afterGetter} from '../lib/aspect';

class CacheAspect {
  @beforeMethod({ classNamePattern: /^(\w+Mapper|Http)$/, methodNamePattern: /^get/})
  before(meta: Metadata) {
    console.log(`Inside CacheAspect.before for ${meta.className}.${meta.method.name} with args ${meta.method.args.join(', ')}`);
  }
  @afterMethod({ classNamePattern: /^(\w+Mapper|Http)$/, methodNamePattern: /^get/})
  @afterGetter({ classNamePattern: /^(\w+Mapper|Http)$/, fieldNamePattern: /^get/})
  after(meta: Metadata) {
    console.log(`Inside CacheAspect.after for ${meta.className}.${meta.method.name} with args ${meta.method.args.join(', ')}`);
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

@Wove()
class Http {
  get(url) {
    console.log(`Called Http.get with url = ${url}`)
  }
  post(url, data) {
    console.log(`Called Http.post with url = ${url}`);
  }
}

@Wove()
class UserMapper {
  constructor(private http:Http) {}
  get(id: number) {
    console.log(`Called UserMapper.get with id = ${id}`);
    this.http.get('http://foo.bar');
    return 'result';
  }
  get getfield() {
    return 42;
  }
}

let mapper = new UserMapper(new Http());
// console.log(mapper.get(42));
console.log(mapper.getfield);

// mapper.getfield = 42;
