import {Aspect} from './Aspect';

class AspectCollection {
  private static INSTANCE:AspectCollection = new AspectCollection();
  private aspects:Aspect[] = new Array<Aspect>();
  constructor() {
    throw new Error('AspectCollection is a Singleton');
  }
  static getInstance():AspectCollection {
    return AspectCollection.INSTANCE;
  }
  register(config:Aspect) {
    this.aspects.push(config);
  }
  getAspects():Aspect[] {
    return this.aspects;
  }
}

export default AspectCollection;
