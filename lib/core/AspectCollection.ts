import {Aspect} from './Aspect';

class AspectCollection {
  private static INSTANCE:AspectCollection = null;
  private aspects:Aspect[] = new Array<Aspect>();
  constructor() {
    if (AspectCollection.INSTANCE === null) {
      AspectCollection.INSTANCE = new AspectCollection();
    } else {
      throw new Error('AspectCollection is a Singleton');
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
