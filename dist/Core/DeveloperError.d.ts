export declare class DeveloperError {
    name: string;
    message: string;
    stack: any;
    static throwInstantiationError(): void;
    constructor(message: string);
    toString(): string;
}
