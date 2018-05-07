# Introduction

[![Build Status](https://travis-ci.org/lizardruss/crosscut.js.svg?branch=master)](https://travis-ci.org/lizardruss/crosscut.js)

Library for aspect-oriented programming with JavaScript, which takes advantage of ECMAScript 2016 decorators syntax.

For further reading on decorators, take a look at [the spec](https://github.com/wycats/javascript-decorators).

Blog post, introduction to the AOP and the library could be found [here](http://blog.mgechev.com/2015/07/29/aspect-oriented-programming-javascript-aop-js).

# Sample usage (Custom Decorators)
To use advice using custom decorators, you can use the `makeMethodDecorator()` and `makeMemberDecorator()` functions. Here's an example:

```ts
import { makeMethodDecorator } from 'crosscut.js';

export const Log = (message?: string) => {
  return makeMethodDecorator(((target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(Log, { message }, target, propertyKey);
  });
};

class LoggerAspect {
  @beforeMethod({
    decorators: [ Log ],
  })
  invokeBeforeMethod(meta: Metadata) {
    let { message } = Reflect.getMetadata(Log, meta.method.context, meta.method.name);
    if (message != null) {
      console.log(message);
    } else {
      console.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
    }
  }
}

class Article {
  id: number;
  title: string;
  content: string;
}

class ArticleCollection {
  articles: Article[] = [];

  @Log()
  getArticle(id: number) {
    console.log(`Getting article with id: ${id}.`);
    return this.articles.filter(a => {
      return a.id === id;
    }).pop();
  }

  @Log('Log a custom message')
  setArticle(article: Article) {
    console.log(`Setting article with id: ${article.id}.`);
    this.articles.push(article);
  }
}

new ArticleCollection().getArticle(1);
new ArticleCollection().setArticle({
  id: 2,
  title: 'Current event',
  content: '...',
});

// Result:
// Inside of the logger. Called ArticleCollection.getArticle with args: 1.
// Getting article with id: 1.
// Log a custom message
// Setting article with id: 2.
```

# Sample usage (@Wove)

To use the aspect.js style of weaving, use the @Wove class decorator.

```ts
import {beforeMethod, Wove, Metadata} from 'crosscut.js';

class LoggerAspect {
  @beforeMethod({
    classNamePattern: /^Article/,
    methodNamePattern: /^(get|set)/
  })
  invokeBeforeMethod(meta: Metadata) {
    // meta.woveMetadata == { bar: 42 }
    console.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
  }
}

class Article {
  id: number;
  title: string;
  content: string;
}

@Wove({ bar: 42 })
class ArticleCollection {
  articles: Article[] = [];
  getArticle(id: number) {
    console.log(`Getting article with id: ${id}.`);
    return this.articles.filter(a => {
      return a.id === id;
    }).pop();
  }
  setArticle(article: Article) {
    console.log(`Setting article with id: ${article.id}.`);
    this.articles.push(article);
  }
}

new ArticleCollection().getArticle(1);

// Result:
// Inside of the logger. Called ArticleCollection.getArticle with args: 1.
// Getting article with id: 1.
```

In case you're using crosscut.js in a browser environment the minifier may break the annotated code because of the performed mangling. In order to handle this problem you can use:

```ts
class LoggerAspect {
  @beforeMethod({
    classes: [ArticleCollection],
    methods: [ArticleCollection.prototype.getArticle, ArticleCollection.prototype.setArticle]
  })
  invokeBeforeMethod(meta: Metadata) {
    // meta.woveMetadata == { bar: 42 }
    console.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
  }
}

class ArticleCollection {
  getArticle(id: number) {...}
  setArticle(article: Article) {...}
}
```

In this case you can omit the `@Wove` decorator.

This way, by explicitly listing the classes and methods which should be woven, you can prevent the unwanted effect of mangling.

# Demo

```
git clone https://github.com/mgechev/aop.js --depth 1
npm install -g ts-node
ts-node demo/index.ts
```

# API

The library offers the following combinations of advices and joint points:

## Method calls

- `beforeMethod(MethodSelector)` - invoked before method call
- `afterMethod(MethodSelector)` - invoked after method call
- `aroundMethod(MethodSelector)` - invoked around method call
- `onThrowOfMethod(MethodSelector)` - invoked on throw of method call
- `asyncOnThrowOfMethod(MethodSelector)` - invoked on throw of async method call

## Static method calls

- `beforeStaticMethod(MethodSelector)` - invoked before static method call
- `afterStaticMethod(MethodSelector)` - invoked after static method call
- `aroundStaticMethod(MethodSelector)` - invoked around static method call
- `onThrowOfStaticMethod(MethodSelector)` - invoked on throw of static method call
- `asyncOnThrowOfStaticMethod(MethodSelector)` - invoked on throw of async static method call

## Accessors

- `beforeSetter(MemberSelector)` - invoked before setter call
- `afterSetter(MemberSelector)` - invoked after setter call
- `aroundSetter(MemberSelector)` - invoked around setter call
- `onThrowOfSetter(MemberSelector)` - invoked on throw of setter call
- `asyncOnThrowOfSetter(MemberSelector)` - invoked on throw of async setter call
- `beforeGetter(MemberSelector)` - invoked before getter call
- `afterGetter(MemberSelector)` - invoked after getter call
- `aroundGetter(MemberSelector)` - invoked around getter call
- `onThrowOfGetter(MemberSelector)` - invoked on throw of getter call
- `asyncOnThrowOfGetter(MemberSelector)` - invoked on throw of async getter call

## `MethodSelector`

```ts
export type DecoratorKey = string | symbol | MethodDecorator | MethodDecoratorFactory;

export interface MethodSelector {
  classNamePattern?: RegExp;
  methodNamePattern?: RegExp;
  classes?: Function[];
  methods?: Function[];
  decorators?: DecoratorKey[];
}
```

## `MemberSelector`

```ts
export type DecoratorKey = string | symbol | MethodDecorator | MethodDecoratorFactory;

export interface MemberSelector {
  classNamePattern?: RegExp;
  fieldNamePattern?: RegExp;
  classes?: Function[];
  methods?: PropertyDescriptor[];
  decorators?: DecoratorKey[];
}
```

## `Metadata`

```ts
export class Metadata {
  public method: MethodMetadata;
  public className: string;
  public woveMetadata: any;
}
```

## `MethodMetadata`

```ts
export class MethodMetadata {
  public proceed: boolean;
  public name: string;
  public args: any[];
  public context: any;
  public result: any;
  public exception: any;
  public invoke: (...args: any[]) => any;
}
```

# Roadmap

- [x] Tests
- [x] Type annotations and DTS generation
- [x] Aspect factories
  - [x] Generic aspects
- [x] Implement the following advices:
  - [x] Before
  - [x] After
    - [x] Throwing
    - [x] Returning
  - [x] Around
- [x] Implement the following joint points:
  - [x] Method execution
  - [x] Static method execution
  - [x] Field get
  - [x] Field set
- [x] Implement selectos
  - [x] Class & method selector
  - [x] Class & field selector
  - [x] Method & field decorator selectors

# License

MIT
