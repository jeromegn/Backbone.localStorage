# Backbone localStorage Adapter v1.1.5

[![Build Status](https://secure.travis-ci.org/jeromegn/Backbone.localStorage.png?branch=master)](http://travis-ci.org/jeromegn/Backbone.localStorage)

Quite simply a localStorage adapter for Backbone. It's a drop-in replacement for Backbone.Sync() to handle saving to a localStorage database.

[![Gittip](http://badgr.co/gittip/jeromegn.png)](https://www.gittip.com/jeromegn/)

## Usage

Include Backbone.localStorage after having included Backbone.js:

```html
<script type="text/javascript" src="backbone.js"></script>
<script type="text/javascript" src="backbone.localStorage.js"></script>
```

Create your collections like so:

```javascript
window.SomeCollection = Backbone.Collection.extend({
  
  localStorage: new Backbone.LocalStorage("SomeCollection"), // Unique name within your app.
  
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
        localstorage: "lib/backbone.localStorage"
    }
});
```

Define your collection as a module:
```javascript
define("someCollection", ["localstorage"], function() {
    var SomeCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("SomeCollection") // Unique name within your app.
    });
  
    return new SomeCollection();
});
```

Require your collection:
```javascript
require(["someCollection"], function(someCollection) {
  // ready to use someCollection
});
```

### CommonJS

If you're using [browserify](https://github.com/substack/node-browserify).

```javascript
var Backbone.LocalStorage = require("backbone.localstorage");
```

##Support

If you're having a problem with using the project, get help at CodersClan.

<a href="http://codersclan.net/forum/index.php?repo_id=67"><img src="http://www.codersclan.net/graphics/getSupport_blue_big.png" width="160"></a>

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

## License

Licensed under MIT license

Copyright (c) 2010 Jerome Gravel-Niquet

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
