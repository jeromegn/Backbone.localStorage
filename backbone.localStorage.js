/**
 * Backbone localStorage Adapter v1.0.1
 *
 * Date: Sun Aug 14 2011 09:53:55 -0400
 */

// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

(function() {

	root = this;

	// Generate four random hex digits.
	function S4() {
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	
	// Generate a pseudo-GUID by concatenating random hexadecimal.
	function guid() {
	   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};
	
	// Our Store is represented by a single JS object in *localStorage*. Create it
	// with a meaningful name, like the name you'd give a table.
	// window.Store is deprectated, use Backbone.LocalStorage instead
	Backbone.LocalStorage = root.Store = function(name) {
	  this.name = name;
	  var store = localStorage.getItem(this.name);
	  this.records = (store && store.split(",")) || [];
	};
	
	_.extend(Backbone.LocalStorage.prototype, {
	
	  // Save the current state of the **Store** to *localStorage*.
	  save: function() {
	    localStorage.setItem(this.name, this.records.join(","));
	  },
	
	  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
	  // have an id of it's own.
	  create: function(model) {
	    if (!model.id) model.id = model.attributes[model.idAttribute] = guid();
	    localStorage.setItem(this.name+"-"+model.id, JSON.stringify(model));
	    this.records.push(model.id.toString());
	    this.save();
	    return model;
	  },
	
	  // Update a model by replacing its copy in `this.data`.
	  update: function(model) {
	    localStorage.setItem(this.name+"-"+model.id, JSON.stringify(model));
	    if (!_.include(this.records, model.id.toString())) {
	    	this.records.push(model.id.toString()); this.save();
	    }
	    return model;
	  },

	  // Retrieve a model from `this.data` by id.
	  find: function(model) {
	    return JSON.parse(localStorage.getItem(this.name+"-"+model.id));
	  },

	  // Return the array of all models currently in storage.
	  findAll: function() {
	    return _(this.records).chain()
	      .map(function(id) {
	      	return JSON.parse(localStorage.getItem(this.name+"-"+id));
      	}, this)
	      .compact()
	      .value();
	  },
	
	  // Delete a model from `this.data`, returning it.
	  destroy: function(model) {
	    localStorage.removeItem(this.name+"-"+model.id);
	    this.records = _.reject(this.records, 
	    	function(record_id){return record_id == model.id.toString();}
	    );
	    this.save();
	    return model;
	  }
	
	});
	
	var defaultSync = Backbone.sync;
	
	// Override `Backbone.sync` to use delegate to the model or collection's
	// *localStorage* property, which should be an instance of `Store`.
	// window.Store.sync is deprectated, use Backbone.LocalStorage.sync instead
	Backbone.LocalStorage.sync = root.Store.sync = Backbone.sync = function(method, model, options, error) {
	
		try {
			var store = model.localStorage || model.collection.localStorage;
			if(!store) throw "Invalid storage.";
		} catch(e) {
			return defaultSync.apply(this, arguments);
		}
	
	  // Backwards compatibility with Backbone <= 0.3.3
	  if (typeof options == 'function') {
	    options = {
	      success: options,
	      error: error
	    };
	  }
	
	  var resp;
	
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

	return Store;
})();
