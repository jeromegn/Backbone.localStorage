# Backbone localStorage and sessionStorage Adapter 0.0.1

A localStorage and sessionStorage adapter for Backbone.
It's a drop-in replacement for Backbone.Sync() to handle saving to the browser's browserStorage or sessionStorage database.

## Usage

Include Backbone.browserStorage after having included Backbone.js:

```html
<script type="text/javascript" src="backbone.js"></script>
<script type="text/javascript" src="backbone.browserStorage.js"></script>
```

Create your collections like so:

```javascript
window.SomeCollection = Backbone.Collection.extend({
  
  // For localStorage, use BrowesrStorage.local.
  browserStorage: new Backbone.BrowserStorage.session("SomeCollection"), // Unique name within your app.
  
  // ... everything else is normal.
  
});
```
### RequireJS

Include [RequireJS](http://requirejs.org):

```html
<script type="text/javascript" src="lib/require.js"></script>
```

RequireJS config: 
```javascript
require.config({
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        browserstorage: "lib/backbone.browserStorage"
    }
});
```

Define your collection as a module:
```javascript
define("SomeCollection", ["browserstorage"], function() {
    var SomeCollection = Backbone.Collection.extend({
        // For localStorage, use BrowserStorage.local.
        browserStorage: new Backbone.BrowserStorage.session("SomeCollection") // Unique name within your app.
    });
  
    return SomeCollection;
});
```

Require your collection:
```javascript
require(["SomeCollection"], function(SomeCollection) {
  // ready to use SomeCollection
});
```

### CommonJS

If you're using [browserify](https://github.com/substack/node-browserify).

Install using `npm install backbone.browserstorage`, and require the module.

```javascript
Backbone.BrowserStorage = require("backbone.browserstorage");
```

## Acknowledgments

This package is a fork of jeromegn's [Backbone.localStorage](https://github.com/jeromegn/Backbone.localStorage)
