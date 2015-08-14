# Introduction

Library for aspect-oriented programming with JavaScript, which takes advantage of ECMAScript 7 decorators syntax.

For further reading on decorators, take a look at [the spec](https://github.com/wycats/javascript-decorators).

The library is based on [meld](https://github.com/cujojs/meld).

Blog post, introduction to the AOP and the library could be found [here](http://blog.mgechev.com/2015/07/29/aspect-oriented-programming-javascript-aop-js/).

# Demo

```
git clone https://github.com/mgechev/aop.js --depth 1
npm install -g babel-node
babel-node --optional es7.decorators demo/index.js
```

# Roadmap

- [x] Type annotations and DTS generation
- [ ] Implement the following joint points:
  - [x] Method execution
  - [ ] Constructor call
  - [ ] Constructor execution
  - [ ] Filed get
  - [ ] Field set
- [ ] Static crosscutting
- [ ] Implement the following advices:
  - [x] Before
    - [ ] Resolve
    - [ ] Reject
  - [x] After
    - [x] Throwing
    - [x] Returning
    - [x] Resolve
    - [x] Reject

# License

MIT
