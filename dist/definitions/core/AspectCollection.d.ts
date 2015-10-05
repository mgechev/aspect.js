import { Aspect } from './Aspect';
declare class AspectCollection {
    private static INSTANCE;
    private aspects;
    constructor();
    static getInstance(): AspectCollection;
    register(config: Aspect): void;
    getAspects(): Aspect[];
}
export default AspectCollection;
