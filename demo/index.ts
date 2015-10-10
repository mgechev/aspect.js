import {Wove, Metadata, MethodMetadata, before, after} from '../lib/aspect';

class CacheAspect {
  @before({ classNamePattern: /^(\w+Mapper|Http)$/, methodNamePattern: /^get/})
  before(meta: Metadata) {
    console.log(`Inside CacheAspect.before for ${meta.className}.${meta.method.name} with args ${meta.method.args.join(', ')}`);
  }
  @after({ classNamePattern: /^(\w+Mapper|Http)$/, methodNamePattern: /^get/})
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
}

let mapper = new UserMapper(new Http());
console.log(mapper.get(42));
