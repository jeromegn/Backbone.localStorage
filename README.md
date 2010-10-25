# Backbone.localStorage

Quite simply a localStorage adapter for Backbone. It's a drop-in replacement for Backbone.Sync() to handle saving to a localStorage database.

## Usage

Include Backbone.localStorage after having included Backbone.js:

    <script type="text/javascript" src="backbone.js"></script>
    <script type="text/javascript" src="backbone.localStorage.js"></script>

Create your collections like so:

    window.SomeCollection = Backbone.Collection.Extend({
      
      localStore: new Store("SomeCollection"), // Unique name within your app.
      
      // New since Backbone.js 0.2
      // The Store provides a JSON reponse like so:
      // {models: [the models], status: "success or error string"}
      
      parse: function(resp) {
        return resp.models;
      },
      
      // ... everything else is normal.
      
    });
    
Add a "parse" function to your models:

    // The Store provides a JSON reponse like so:
    // {models: model_data, status: "success or error string"}
    
    parse: function(resp) {
      return resp.model;
    }
  
Feel free to use Backbone as you usually would, this is a drop-in replacement.