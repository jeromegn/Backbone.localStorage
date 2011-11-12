/**
 * Backbone localStorage Adapter v1.1
 * https://github.com/jeromegn/Backbone.localStorage
 *
 * Date: Sun Aug 14 2011 09:53:55 -0400
 */

// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

// Generate four random hex digits.
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

// Getter and setter for the list of model IDs in storage.
function getIds(name) {
  var storedIDs = localStorage.getItem(name);
  return (storedIDs && storedIDs.split(",")) || [];
}
function setIds(name, ids) {
  localStorage.setItem(name, (ids || []).join(","));
  return ids;
}

// Our Store is represented by a list of model IDs, and the stringified
// version of the models, in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
window.Store = function(name) {
  this.name = name;
};

_.extend(Store.prototype, {

  // No-op: localStorage is immediately updated in create, update, and destroy
  save: function() {
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model) {
    if (!model.id) {
      model.id = model.attributes.id = guid();
    }
    localStorage.setItem(this.name+"-"+model.id, JSON.stringify(model));
    setIds(this.name, getIds(this.name).concat(model.id.toString()));
    return model;
  },

  // Update a model by replacing its copy in *localStorage*.
  update: function(model) {
    localStorage.setItem(this.name+"-"+model.id, JSON.stringify(model));
    if (!_.include(getIds(this.name), model.id.toString())) {
      setIds(this.name, getIds(this.name).concat(model.id.toString()));
    }
    return model;
  },

  // Retrieve a model from *localStorage* by id.
  find: function(model) {
    return JSON.parse(localStorage.getItem(this.name+"-"+model.id));
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    return _.map(getIds(this.name), function(id) {
      return JSON.parse(localStorage.getItem(this.name+"-"+id));
    }, this);
  },

  // Delete a model from *localStorage*, returning it.
  destroy: function(model) {
    localStorage.removeItem(this.name+"-"+model.id);
    setIds(this.name, _.without(getIds(this.name), model.id.toString()));
    return model;
  }

});

// Override `Backbone.sync` to use delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
Backbone.sync = function(method, model, options, error) {

  // Backwards compatibility with Backbone <= 0.3.3
  if (typeof options == 'function') {
    options = {
      success: options,
      error: error
    };
  }

  var resp;
  var store = model.localStorage || model.collection.localStorage;

  switch (method) {
    case "read":    resp = model.id ? store.find(model) : store.findAll(); break;
    case "create":  resp = store.create(model);                            break;
    case "update":  resp = store.update(model);                            break;
    case "delete":  resp = store.destroy(model);                           break;
  }

  if (resp) {
    options.success(resp);
  } else {
    options.error("Record not found");
  }
};
