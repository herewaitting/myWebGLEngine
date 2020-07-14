/*
 * @Descripttion: 
 * @version: 
 * @Author: STC
 * @Date: 2020-07-04 14:20:15
 * @LastEditors: STC
 * @LastEditTime: 2020-07-06 15:51:05
 */ 
/**
 * @function
 *
 * @param {*} value The object.
 * @returns {Boolean} Returns true if the object is defined, returns false otherwise.
 *
 * @example
 * if (Cesium.defined(positions)) {
 *      doSomething();
 * } else {
 *      doSomethingElse();
 * }
 */
function defined(value: any) {
  return value !== undefined && value !== null;
}
export default defined;
