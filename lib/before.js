import Aspect from './core/Aspect';
import {AspectCollection} from './core/AspectCollection';

let before = (classPattern, methodPattern) => {
  'use strict';
  return (target, key) => {
    let advice = target[key];
    let when = 'before';
    AspectCollection.register(new Aspect({
      classPattern,
      methodPattern,
      advice,
      when
    }));
  };
};

export default before;
