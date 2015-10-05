declare let AsyncAdvices: {
    beforeResolve: (classPattern: any, methodPattern: any) => (target: any, key: any, descriptor: any) => void;
    beforeReject: (classPattern: any, methodPattern: any) => (target: any, key: any, descriptor: any) => void;
    afterResolve: (classPattern: any, methodPattern: any) => (target: any, key: any, descriptor: any) => void;
    afterReject: (classPattern: any, methodPattern: any) => (target: any, key: any, descriptor: any) => void;
};
export default AsyncAdvices;
