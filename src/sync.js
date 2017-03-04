import Bb from 'backbone';
import {isUndefined, result} from 'underscore';

import {getLocalStorage} from './utils'


/** Get the Deferred status from $ if we have jQuery, otherwise use Backbone's
 *  @returns {boolean} - Whether the request was deferred
*/
function getDeferred() {
  if (Bb.$) {
    return result(Bb.$, 'Deferred', false);
  }
  return result(Bb, 'Deferred', false);
}


/** Override Backbone's `sync` method to run against localStorage
 * @param {string} method - One of read/create/update/delete
 * @param {Model} model - Backbone model to sync
 * @param {Object} options - Options object, use `ajaxSync: true` to run the
 *  operation against the server in which case, options will also be passed into
 *  `jQuery.ajax`
 * @returns {undefined}
 */
export function sync(method, model, options = {}) {
  const store = getLocalStorage(model);
  let resp, errorMessage;
  const syncDfd = getDeferred();

  try {
    switch (method) {
      case 'read':
        resp = isUndefined(model.id) ? store.findAll() : store.find(model);
        break;
      case 'create':
        resp = store.create(model);
        break;
      case 'patch':
      case 'update':
        resp = store.update(model);
        break;
      case 'delete':
        resp = store.destroy(model);
        break;
    }

  } catch (error) {
    if (error.code === 22 && store._storageSize() === 0) {
      errorMessage = 'Private browsing is unsupported';
    } else {
      errorMessage = error.message;
    }
  }

  if (resp) {
    if (options && options.success) {
      if (Bb.VERSION === '0.9.10') {
        options.success(model, resp, options);
      } else {
        options.success(resp);
      }
    }
    if (syncDfd) {
      syncDfd.resolve(resp);
    }

  } else {
    errorMessage = errorMessage ? errorMessage : 'Record Not Found';

    if (options && options.error) {
      if (Bb.VERSION === '0.9.10') {
        options.error(model, errorMessage, options);
      } else {
        options.error(errorMessage);
      }
    }

    if (syncDfd) {
      syncDfd.reject(errorMessage);
    }
  }

  // add compatibility with $.ajax
  // always execute callback for success and error
  if (options && options.complete) {
    options.complete(resp);
  }

  return syncDfd && syncDfd.promise();
}
