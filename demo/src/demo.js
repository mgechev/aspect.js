import {
  before, after, Wove, Aspect
} from '../dist/aop.js';


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

@Aspect
class Logger {
  @before(/.*/, /^get/)
  logBefore() {
    console.log('Before advice');
  }
  @after(/.*/, /^get/)
  logBefore() {
    console.log('Before advice');
  }
}
