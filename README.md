# Backbone localStorage Backend

An adapter that replaces `Backbone.sync` to save to `window.localStorage`
instead of to the server.

## Usage

Import `backbone.local` and attach it to your models and collections:

```javascript
import {Collection, Model} from 'backbone';
import {LocalStorage} from 'backbone.localstorage';

const SomeCollection = Collection.extend({

  localStorage: new LocalStorage('SomeCollection'), // Uniquely identify this

});

const SomeModel = Model.extend({

  localStorage: new LocalStorage('SomeModel')

});
```

To synchronise with the server, you can pass the `ajaxSync` flag to any options:

```javascript
const myModel = new SomeModel();
myModel.fetch({
  ajaxSync: true  // Fetches from the server
});

myModel.save({
  new: "value"
}, {
  ajaxSync: true  // Pushes back to the server
});
```

## Contributing

Install NodeJS and run `yarn` or `npm i` to get your dependencies, then:

1. Open an issue identifying the fault
2. Provide a fix, with tests demonstrating the issue
3. Run `npm test`
4. Create a pull request


## Acknowledgments

- [Jerome Gravel-Niquet](https://github.com/jeromegn): Wrote the initial `backbone.localstorage`
- [Mark Woodall](https://github.com/llad): Initial tests (now refactored);
- [Martin Häcker](https://github.com/dwt): Many fixes and the test isolation.
- [Mark Woodall](https://github.com/llad): initial tests (now refactored);
- [Martin Häcker](https://github.com/dwt): many fixes and the test isolation.

## License

Licensed under MIT license

Copyright (c) 2010-2015 Jerome Gravel-Niquet

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
