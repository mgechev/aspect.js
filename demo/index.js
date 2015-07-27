import {Wove, advices} from '../lib/aop';

// the advice
class Logger {
  @advices.before(/.*/, /^get/)
  logBefore() {
    console.log('Before advice');
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
    return this.articles.filter(a => a.id === id).pop();
  }
}

let collection = new ArticleCollection();
console.log(collection.getArticleById(42));
