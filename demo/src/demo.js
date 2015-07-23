import {
  before, Wove, Aspect
} from '../../dist/all.js';

class Logger {
  @before(/.*/, /^get/)
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


