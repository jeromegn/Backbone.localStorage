import Backbone from 'backbone';

import {LocalStorage} from './localstorage';
import {sync as localSync} from './sync';
import {getLocalStorage} from './utils';


Backbone.LocalStorage = LocalStorage;
const ajaxSync = Backbone.sync;

/** Get the local or ajax sync call
 * @param {Model} model - Model to sync
 * @param {object} options - Options to pass, takes ajaxSync
 * @returns {function} The sync method that will be called
 */
function getSyncMethod(model, options = {}) {
  const forceAjaxSync = options.ajaxSync;
  const hasLocalStorage = getLocalStorage(model);

  return !forceAjaxSync && hasLocalStorage ? localSync : ajaxSync
}


Backbone.sync = function(method, model, options) {
  return getSyncMethod(model, options).apply(this, [method, model, options]);
};

export {LocalStorage};
