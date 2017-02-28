import {isUndefined, result} from 'underscore';

/** Generates 4 random hex digits
 * @returns {string} 4 Random hex digits
*/
function s4() {
  const rand = (1 + Math.random()) * 0x10000;
  return (rand | 0).toString(16).substring(1)
}

/** Generate a pseudo-guid
 * @returns {string} A GUID-like string.
 */
export function guid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}


/** Returns the localStorage attribute for a model
 * @param {Model} model - Model to get localStorage
 * @returns {Storage} The localstorage
 */
export function getLocalStorage(model) {
  return result(model, 'localStorage') || result(model.collection, 'localStorage');
}


/** Return the window or global object.
 * @returns {window} Window object
 */
export function getWindow() {
  return isUndefined(window) ? global : window;
}
