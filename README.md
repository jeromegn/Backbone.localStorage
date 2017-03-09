# Backbone localStorage Backend

[![Build Status](https://travis-ci.org/jeromegn/Backbone.localStorage.svg?branch=master)](https://travis-ci.org/jeromegn/Backbone.localStorage)
[![Coverage Status](https://coveralls.io/repos/github/jeromegn/Backbone.localStorage/badge.svg?branch=master)](https://coveralls.io/github/jeromegn/Backbone.localStorage?branch=master)
[![npm version](https://badge.fury.io/js/backbone.localstorage.svg)](https://badge.fury.io/js/backbone.localstorage)

An adapter that replaces `Backbone.sync` to save to `window.localStorage`
instead of to the server.

**Note** Backbone LocalStorage v2 changes the API to work more with ES6 modules.
See [Upgrade Notes](#upgrade-notes) for more details.

## Usage

Import `backbone.localstorage` and attach it to your models and collections:

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

## Upgrade Notes

Backbone LocalStorage is now built using ES6. It should be fully compatible with
v1 with one difference: Instead of exporting the `LocalStorage` class as a
default module, v2 exports it as a named variable. Below are examples covering
the changes:

### JavaScript ES5

In v1:

```javascript
var LocalStorage = require('backbone.localstorage');
```

In v2:

```javascript
var localStorage = require('backbone.localstorage');
var LocalStorage = localStorage.LocalStorage;
```

### JavaScript ES6+

In v1:

```javascript
import LocalStorage from 'backbone.localstorage';
```

In v2:

```javascript
import {LocalStorage} from 'backbone.localstorage';
```

## Contributing

Install NodeJS and run `yarn` or `npm i` to get your dependencies, then:

1. Open an issue identifying the fault
2. Provide a fix, with tests demonstrating the issue
3. Run `npm test`
4. Create a pull request


## Acknowledgments

- [Mark Woodall](https://github.com/llad): Initial tests (now refactored)
- [Martin Häcker](https://github.com/dwt): Many fixes and the test isolation
