(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("backbone"));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else if(typeof exports === 'object')
		exports["Backbone.LocalStorage"] = factory(require("underscore"), require("backbone"));
	else
		root["Backbone.LocalStorage"] = factory(root["_"], root["Backbone"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guid = guid;
exports.getLocalStorage = getLocalStorage;
exports.getWindow = getWindow;

var _underscore = __webpack_require__(1);

/** Generates 4 random hex digits
 * @returns {string} 4 Random hex digits
*/
function s4() {
  var rand = (1 + Math.random()) * 0x10000;
  return (rand | 0).toString(16).substring(1);
}

/** Generate a pseudo-guid
 * @returns {string} A GUID-like string.
 */
function guid() {
  return '' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/** Returns the localStorage attribute for a model
 * @param {Model} model - Model to get localStorage
 * @returns {Storage} The localstorage
 */
function getLocalStorage(model) {
  return (0, _underscore.result)(model, 'localStorage') || (0, _underscore.result)(model.collection, 'localStorage');
}

/** Return the window or global object.
 * @returns {window} Window object
 */
function getWindow() {
  return (0, _underscore.isUndefined)(window) ? global : window;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorage = undefined;

var _backbone = __webpack_require__(2);

var _backbone2 = _interopRequireDefault(_backbone);

var _localstorage = __webpack_require__(4);

var _sync = __webpack_require__(5);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_backbone2.default.LocalStorage = _localstorage.LocalStorage;
var ajaxSync = _backbone2.default.sync;

/** Get the local or ajax sync call
 * @param {Model} model - Model to sync
 * @param {object} options - Options to pass, takes ajaxSync
 * @returns {function} The sync method that will be called
 */
function getSyncMethod(model) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var forceAjaxSync = options.ajaxSync;
  var hasLocalStorage = (0, _utils.getLocalStorage)(model);

  return !forceAjaxSync && hasLocalStorage ? _sync.sync : ajaxSync;
}

_backbone2.default.sync = function (method, model, options) {
  return getSyncMethod(model, options).apply(this, [method, model, options]);
};

exports.LocalStorage = _localstorage.LocalStorage;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** The default serializer for transforming your saved data to localStorage */
var defaultSerializer = {

  /** Return a JSON-serialized string representation of item
   * @param {Object} item - The encoded model data
   * @returns {string} A JSON-encoded string
   */
  serialize: function serialize(item) {
    return (0, _underscore.isObject)(item) ? JSON.stringify(item) : item;
  },


  /** Custom deserialization for data. This includes a fix for an Android bug
   * which raises an error attempting to deserialize null
   * @param {string} data - JSON-encoded string
   * @returns {Object} The object result of parsing data
   */
  deserialize: function deserialize(data) {
    return data && JSON.parse(data);
  }
};

/** LocalStorage proxy class for Backbone models.
 * Usage:
 *   export const MyModel = Backbone.Model.extend({
 *     localStorage: new LocalStorage('MyModelName')
 *   });
 */

var LocalStorage = exports.LocalStorage = function () {
  function LocalStorage() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var serializer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSerializer;

    _classCallCheck(this, LocalStorage);

    this.name = name;
    this.serializer = serializer;

    if (!this.localStorage) {
      throw 'Backbone.localStorage: Environment does not support localStorage.';
    }

    var store = this._getItem(this.name);
    this.records = store && store.split(',') || [];
  }

  /** Return the global localStorage variable
   * @returns {Object} Local Storage reference.
  */


  _createClass(LocalStorage, [{
    key: 'localStorage',
    value: function localStorage() {
      return (0, _utils.getWindow)().localStorage;
    }

    /** Save the current status to localStorage
     * @returns {undefined}
     */

  }, {
    key: 'save',
    value: function save() {
      this._setItem(this.name, this.records.join(','));
    }

    /** Add a new model with a unique GUID, if it doesn't already have its own ID
     * @param {Model} model - The Backbone Model to save to LocalStorage
     * @returns {Model} The saved model
     */

  }, {
    key: 'create',
    value: function create(model) {
      if (!model.id && model.id !== 0) {
        model.id = (0, _utils.guid)();
        model.set(model.idAttribute, model.id);
      }

      this._setItem(this._itemName(model.id), this.serializer.serialize(model));
      this.records.push(model.id.toString());
      this.save();

      return this.find(model);
    }

    /** Update an existing model in LocalStorage
     * @param {Model} model - The model to update
     * @returns {Model} The updated model
     */

  }, {
    key: 'update',
    value: function update(model) {
      this._setItem(this._itemName(model.id), this.serializer.serialize(model));

      var modelId = model.id.toString();

      if (!(0, _underscore.contains)(this.records, modelId)) {
        this.records.push(modelId);
        this.save();
      }
      return this.find(model);
    }

    /** Retrieve a model from local storage by model id
     * @param {Model} model - The Backbone Model to lookup
     * @returns {Model} The model from LocalStorage
     */

  }, {
    key: 'find',
    value: function find(model) {
      return this.serializer.deserialize(this._getItem(this._itemName(model.id)));
    }

    /** Return all models from LocalStorage
     * @returns {Array} The array of models stored
     */

  }, {
    key: 'findAll',
    value: function findAll() {
      var _this = this;

      return (0, _underscore.chain)(this.records).map(function (id) {
        return _this.serializer.deserialize(_this._getItem(_this._itemName(id)));
      }).filter(function (item) {
        return item != null;
      }).value();
    }

    /** Delete a model from `this.data`, returning it.
     * @param {Model} model - Model to delete
     * @returns {Model} Model removed from this.data
    */

  }, {
    key: 'destroy',
    value: function destroy(model) {
      this._removeItem(this._itemName(model.id));
      var newRecords = (0, _underscore.without)(this.records, model);

      this.records = newRecords;
      this.save();

      return model;
    }

    /** Clear localStorage for a collection
     * @returns {undefined}
     */

  }, {
    key: '_clear',
    value: function _clear() {
      var local = this.localStorage();
      var itemRe = new RegExp('^' + this.name + '-');

      // Remove id-tracking item (e.g., "foo").
      local.removeItem(this.name);

      // Match all data items (e.g., "foo-ID") and remove.
      for (var k in local) {
        if (itemRe.test(k)) {
          local.removeItem(k);
        }
      }

      this.records.length = 0;
    }

    /** Number of items in localStorage
     * @returns {integer} - Number of items
     */

  }, {
    key: '_storageSize',
    value: function _storageSize() {
      return this.localStorage().length;
    }

    /** Return the item from localStorage
     * @param {string} name - Name to lookup
     * @returns {string} Value from localStorage
     */

  }, {
    key: '_getItem',
    value: function _getItem(name) {
      return this.localStorage().getItem(name);
    }

    /** Return the item name to lookup in localStorage
     * @param {integer} id - Item ID
     * @returns {string} Item name
    */

  }, {
    key: '_itemName',
    value: function _itemName(id) {
      return this.name + '-' + id;
    }

    /** Proxy to the localStorage setItem value method
     * @param {string} key - LocalStorage key to set
     * @param {string} value - LocalStorage value to set
     * @returns {undefined}
     */

  }, {
    key: '_setItem',
    value: function _setItem(key, value) {
      this.localStorage().setItem(key, value);
    }

    /** Proxy to the localStorage removeItem method
     * @param {string} key - LocalStorage key to remove
     * @returns {undefined}
     */

  }, {
    key: '_removeItem',
    value: function _removeItem(key) {
      this.localStorage().removeItem(key);
    }
  }]);

  return LocalStorage;
}();

;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = sync;

var _backbone = __webpack_require__(2);

var _backbone2 = _interopRequireDefault(_backbone);

var _underscore = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Get the Deferred status from $ if we have jQuery, otherwise use Backbone's
 *  @returns {boolean} - Whether the request was deferred
*/
function getDeferred() {
  if (_backbone2.default.$) {
    return (0, _underscore.result)(_backbone2.default.$, 'Deferred', false);
  }
  return (0, _underscore.result)(_backbone2.default, 'Deferred', false);
}

/** Override Backbone's `sync` method to run against localStorage
 * @param {string} method - One of read/create/update/delete
 * @param {Model} model - Backbone model to sync
 * @param {Object} options - Options object, use `ajaxSync: true` to run the
 *  operation against the server in which case, options will also be passed into
 *  `jQuery.ajax`
 * @returns {undefined}
 */
function sync(method, model) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var store = (0, _utils.getLocalStorage)(model);
  var resp = void 0,
      errorMessage = void 0;
  var syncDfd = getDeferred();

  try {
    switch (method) {
      case 'read':
        resp = (0, _underscore.isUndefined)(model.id) ? store.findAll() : store.find(model);
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
    if (options.success) {
      options.success.call(model, resp, options);
    }
    if (syncDfd) {
      syncDfd.resolve(resp);
    }
  } else {
    errorMessage = errorMessage ? errorMessage : 'Record Not Found';

    if (options.error) {
      options.error.call(model, errorMessage, options);
    }
    if (syncDfd) {
      syncDfd.reject(errorMessage);
    }
  }

  // add compatibility with $.ajax
  // always execute callback for success and error
  if (options.complete) {
    options.complete.call(model, resp);
  }

  return syncDfd && syncDfd.promise();
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
});