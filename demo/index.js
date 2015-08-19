import {Wove} from '../dist/js/aspect';
import {before, after, afterResolve, afterReject} from '../dist/js/aspect/advices';

// the advice
class Logger {
  @before(/.*/, /^get/)
  logBefore(meta, ...args) {
    console.log(`Invoked ${meta.name} with arguments: ${args.join(', ')}`);
  }
  @after(/.*/, /^get/)
  logAfter(data, returnRes) {
    console.log('After', data, returnRes);
  }
  @afterReject(/.*/, /^asyncMethod1/)
  logAfterReject(data, returnRes) {
    console.log('After reject', data, returnRes);
  }
  @afterResolve(/.*/, /^asyncMethod2/)
  logAfterResolve(data, returnRes) {
    console.log('After resolve', data, returnRes);
  }
}

@Wove
class ArticleCollection {
  constructor() {
    this.articles = [{
      id: 42,
      name: 'Lorem ipsum'
    }];
  }
  getArticleById(id) {
    console.log('Inside');
    return this.articles.filter(a => a.id === id).pop();
  }
  asyncMethod1(arg) {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(arg), 1000);
    });
  }
  asyncMethod2(arg) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(arg), 1000);
    });
  }
}

let collection = new ArticleCollection();
//collection.asyncMethod1(42)
//  .catch(() => {
//    console.log('Handling');
//  });

collection.asyncMethod2(42)
  .then(() => {
    console.log('Handling');
  });
