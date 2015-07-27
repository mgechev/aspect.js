import {Wove, around, before, after} from '../lib/aop';

// the advice
class Logger {
  @before(/.*/, /^get/)
  logBefore(data) {
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
