# Backbone localStorage Adapter

An adapter that replaces `Backbone#sync` to save to `window.localStorage`
instead of to the server.

## Usage

Include Backbone.localStorage after having included Backbone.js:

```html
<script type="text/javascript" src="backbone.js"></script>
<script type="text/javascript" src="backbone.localStorage.js"></script>
```

Create your collections like so:

```javascript
import {Collection} from 'backbone';
import {LocalStorage} from 'backbone.localstorage';

const SomeCollection = Collection.extend({

  localStorage: new LocalStorage("SomeCollection"), // Unique name within your app.

  // ... everything else is normal.

});
```

If needed, you can use the default `Backbone.sync` (instead of local storage) by
passing the `ajaxSync` option flag to any Backbone AJAX function, for example:

```javascript
var myModel = new SomeModel();
myModel.fetch({ ajaxSync: true });
myModel.save({ new: "value" }, { ajaxSync: true });
```

### CommonJS

If you're using [browserify](https://github.com/substack/node-browserify).

Install using `npm install backbone.localstorage`, and require the module.

```javascript
Backbone.LocalStorage = require("backbone.localstorage");
```

## Contributing

You'll need node and to `npm install` before being able to run the minification script.

1. Fork;
2. Write code, with tests;
3. `make test` or `open spec/runner.html`;
4. Create a pull request.

Have fun!

## Acknowledgments

- [Mark Woodall](https://github.com/llad): initial tests (now refactored);
- [Martin Häcker](https://github.com/dwt): many fixes and the test isolation.
