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
