import {Wove, Metadata, MethodMetadata, before, after} from '../lib/aspect';

// the advice
class Logger {
  @before({ classNamePattern: /.*/, methodNamePattern: /.*/ })
  logBefore(meta, ...args) {
    console.log(`Invoked ${meta.method.name} with arguments: ${args.join(', ')}`);
  }
}

@Wove()
class ArticleCollection {
  articles: any[];
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
collection.getArticleById(42);