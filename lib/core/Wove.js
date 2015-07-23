import {applyAspects} from './AspectCollection';

export default (target) => {
  'use strict';
  applyAspects(target.prototype);
};
