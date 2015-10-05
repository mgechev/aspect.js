declare class Advice {
    exec: Function;
    when: string;
    constructor(exec: Function, when: string);
}
export default Advice;
