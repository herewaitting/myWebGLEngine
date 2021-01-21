/**
 * A generic utility class for managing subscribers for a particular event.
 * This class is usually instantiated inside of a container class and
 * exposed as a property for others to subscribe to.
 *
 * @alias Event
 * @constructor
 * @example
 * MyObject.prototype.myListener = function(arg1, arg2) {
 *     this.myArg1Copy = arg1;
 *     this.myArg2Copy = arg2;
 * }
 *
 * var myObjectInstance = new MyObject();
 * var evt = new Cesium.Event();
 * evt.addEventListener(MyObject.prototype.myListener, myObjectInstance);
 * evt.raiseEvent('1', '2');
 * evt.removeEventListener(MyObject.prototype.myListener);
 */
declare class Event {
    _listeners: any[];
    _scopes: any[];
    _toRemove: any[];
    _insideRaiseEvent: boolean;
    constructor();
    addEventListener: (listener: any, scope: any) => () => void;
    /**
     * Unregisters a previously registered callback.
     *
     * @param {Function} listener The function to be unregistered.
     * @param {Object} [scope] The scope that was originally passed to addEventListener.
     * @returns {Boolean} <code>true</code> if the listener was removed; <code>false</code> if the listener and scope are not registered with the event.
     *
     * @see Event#addEventListener
     * @see Event#raiseEvent
     */
    removeEventListener: (listener: any, scope: any) => boolean;
    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     *
     * @param {...Object} arguments This method takes any number of parameters and passes them through to the listener functions.
     *
     * @see Event#addEventListener
     * @see Event#removeEventListener
     */
    raiseEvent: (rest: any[]) => void;
}
export default Event;
