import {Wove, around, before, after} from '../lib/aop';

// the advice
class Logger {
  @before(/.*/, /^get/)
  @after(/.*/, /^get/)
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
    return this.articles.filter(a => a.id === id).pop();
  }
}

let collection = new ArticleCollection();
console.log(collection.getArticleById(42));
