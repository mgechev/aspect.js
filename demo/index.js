import {Wove} from '../lib/aop';
import {after, afterResolve, afterReject} from '../lib/aop/advices';

// the advice
class Logger {
  @afterReject(/.*/, /^async/)
  @afterResolve(/.*/, /^async/)
  @after(/.*/, /^get/)
  logBefore(data) {
    return Promise.resolve(console.log('Around', data));
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
  asyncMethod(arg) {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(arg), 1000);
    });
  }
}

let collection = new ArticleCollection();
collection.getArticleById(42);
collection.asyncMethod(42);
