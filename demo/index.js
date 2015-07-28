import {Wove} from '../lib/aop';
import {afterThrowing} from '../lib/aop/advices';

// the advice
class Logger {
  @afterThrowing(/.*/, /^get/)
  logBefore(data) {
    console.log('Around');
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
    throw 'Error';
    return this.articles.filter(a => a.id === id).pop();
  }
}

let collection = new ArticleCollection();
console.log(collection.getArticleById(42));
