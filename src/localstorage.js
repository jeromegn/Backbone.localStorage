import root from 'window-or-global'
import {isObject} from 'underscore';

const defaultSerializer = {
  serialize(item) {
    return isObject(item) ? JSON.stringify(item) : item;
  },

  // fix for 'illegal access' error on Android when JSON.parse is passed null
  deserialize(data) {
    return data && JSON.parse(data);
  }
}

export class LocalStorage {
  constructor(name = '', serializer = defaultSerializer) {
    this.name = name;
    this.serializer = serializer;

    if (!this.localStorage) {
      throw 'Backbone.localStorage: Environment does not support localStorage.'
    }
  }

  localStorage() {
    return root.localStorage
  }
};
