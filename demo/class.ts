import './aspect';
import { Advised } from '../lib/index';

@Advised()
class Demo {
  get(foo: any, bar: any): string {
    return 'Demo';
  }
}

const d = new Demo();
d.get(1, 2);
