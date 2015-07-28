import {Wove} from '../lib/aop';
import {after, afterResolve} from '../lib/aop/advices';

// the advice
class Logger {
  @afterResolve(/.*/, /^async/)
  @after(/.*/, /^get/)
  logBefore(data) {
    console.log('Around', data);
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
    return new Promise(resolve => {
      setTimeout(() => resolve(arg), 1000);
    });
  }
}

let collection = new ArticleCollection();
console.log(collection.getArticleById(42));
console.log(collection.asyncMethod(42));
