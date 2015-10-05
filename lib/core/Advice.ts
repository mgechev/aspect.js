export default class Advice {
  constructor(
    public context:Object,
    public exec:Function,
    public when:string
  ) { }
}

