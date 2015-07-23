class AspectCollection {
  constructor() {
    this.aspects = [];
  }
  register(config) {
    this.aspects.push(config);
  }
}

export default new AspectCollection();
