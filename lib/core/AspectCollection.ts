import {Aspect} from './Aspect';

class AspectCollection {
  private static INSTANCE:AspectCollection = new AspectCollection();
  private aspects:Aspect[] = new Array<Aspect>();
  constructor() {
    if (AspectCollection.INSTANCE) {
      throw new Error('AspectCollection is a Singleton');
    } else {
      AspectCollection.INSTANCE = this;
    }
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
