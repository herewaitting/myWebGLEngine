declare class Event {
    _listeners: any[];
    _scopes: any[];
    _toRemove: any[];
    _insideRaiseEvent: boolean;
    constructor();
    addEventListener: (listener: any, scope: any) => () => void;
    removeEventListener: (listener: any, scope: any) => boolean;
    raiseEvent: (rest: any[]) => void;
}
export default Event;
