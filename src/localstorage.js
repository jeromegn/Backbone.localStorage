import {chain, contains, isObject, without} from 'underscore';

import {getWindow, guid} from './utils';


/** The default serializer for transforming your saved data to localStorage */
const defaultSerializer = {

  /** Return a JSON-serialized string representation of item
   * @param {Object} item - The encoded model data
   * @returns {string} A JSON-encoded string
   */
  serialize(item) {
    return isObject(item) ? JSON.stringify(item) : item;
  },

  /** Custom deserialization for data. This includes a fix for an Android bug
   * which raises an error attempting to deserialize null
   * @param {string} data - JSON-encoded string
   * @returns {Object} The object result of parsing data
   */
  deserialize(data) {
    return data && JSON.parse(data);
  }
}

/** LocalStorage proxy class for Backbone models.
 * Usage:
 *   export const MyModel = Backbone.Model.extend({
 *     localStorage: new LocalStorage('MyModelName')
 *   });
 */
export class LocalStorage {
  constructor(name = '', serializer = defaultSerializer) {
    this.name = name;
    this.serializer = serializer;

    if (!this.localStorage) {
      throw 'Backbone.localStorage: Environment does not support localStorage.'
    }

    const store = this._getItem(this.name);
    this.records = (store && store.split(',')) || [];
  }

  /** Return the global localStorage variable
   * @returns {Object} Local Storage reference.
  */
  localStorage() {
    return getWindow().localStorage
  }

  /** Save the current status to localStorage
   * @returns {undefined}
   */
  save() {
    this._setItem(this.name, this.records.join(','));
  }

  /** Add a new model with a unique GUID, if it doesn't already have its own ID
   * @param {Model} model - The Backbone Model to save to LocalStorage
   * @returns {Model} The saved model
   */
  create(model) {
    if (!model.id && model.id !== 0) {
      model.id = guid();
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
  update(model) {
    this._setItem(this._itemName(model.id), this.serializer.serialize(model));

    const modelId = model.id.toString();

    if (!contains(this.records, modelId)) {
      this.records.push(modelId);
      this.save();
    }
    return this.find(model);
  }

  /** Retrieve a model from local storage by model id
   * @param {Model} model - The Backbone Model to lookup
   * @returns {Model} The model from LocalStorage
   */
  find(model) {
    return this.serializer.deserialize(this._getItem(this._itemName(model.id)));
  }

  /** Return all models from LocalStorage
   * @returns {Array} The array of models stored
   */
  findAll() {
    return chain(this.records).map(
      id => this.serializer.deserialize(this._getItem(this._itemName(id)))
      ).filter(
        item => item != null).value();
  }

  /** Delete a model from `this.data`, returning it.
   * @param {Model} model - Model to delete
   * @returns {Model} Model removed from this.data
  */
  destroy(model) {
    this._removeItem(this._itemName(model.id));
    const newRecords = without(this.records, model);

    this.records = newRecords;
    this.save();

    return model;
  }

  /** Clear localStorage for a collection
   * @returns {undefined}
   */
  _clear() {
    const local = this.localStorage();
    const itemRe = new RegExp(`^${this.name}-`);

    // Remove id-tracking item (e.g., "foo").
    local.removeItem(this.name);

    // Match all data items (e.g., "foo-ID") and remove.
    for (let k in local) {
      if (itemRe.test(k)) {
        local.removeItem(k);
      }
    }

    this.records.length = 0;
  }

  /** Number of items in localStorage
   * @returns {integer} - Number of items
   */
  _storageSize() {
    return this.localStorage().length;
  }

  /** Return the item from localStorage
   * @param {string} name - Name to lookup
   * @returns {string} Value from localStorage
   */
  _getItem(name) {
    return this.localStorage().getItem(name);
  }

  /** Return the item name to lookup in localStorage
   * @param {integer} id - Item ID
   * @returns {string} Item name
  */
  _itemName(id) {
    return `${this.name}-${id}`;
  }

  /** Proxy to the localStorage setItem value method
   * @param {string} key - LocalStorage key to set
   * @param {string} value - LocalStorage value to set
   * @returns {undefined}
   */
  _setItem(key, value) {
    this.localStorage().setItem(key, value);
  }

  /** Proxy to the localStorage removeItem method
   * @param {string} key - LocalStorage key to remove
   * @returns {undefined}
   */
  _removeItem(key) {
    this.localStorage().removeItem(key);
  }
};
