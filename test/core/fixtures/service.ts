import { Memoize } from './memoize';
import { Cache } from './cache';

export class Service {
  @Memoize('memoize:method1')
  @Cache('method1')
  public method1() {
    console.log('method1 called');
  }
}
