import {clone} from 'underscore';
import root from 'window-or-global';
import Bb from 'backbone';
import {LocalStorage} from 'backbone.localstorage';

import expect from 'expect.js';

const attributes = {
  string: 'String',
  string2: 'String 2',
  number: 1337
};

const SavedModel = Bb.Model.extend({
  localStorage: new LocalStorage('SavedModel'),
  defaults: attributes
});

const AjaxModel = Bb.Model.extend({
  defaults: attributes
});

const SavedCollection = Bb.Collection.extend({
  model: AjaxModel,
  localStorage: new LocalStorage('SavedCollection')
});


describe('LocalStorage Model', function() {
  let mySavedModel;

  beforeEach(function() {
    mySavedModel = new SavedModel({
      id: 10
    });
  });

  afterEach(function() {
    mySavedModel = null;
    root.localStorage.clear();
  });

  it('is saved with the given name', function() {
    mySavedModel.save();
    const item = root.localStorage.getItem('SavedModel-10');
    const parsed = JSON.parse(item);

    expect(parsed.id).to.be(10);
    expect(parsed.string).to.be('String');
    expect(parsed.string2).to.be('String 2');
    expect(parsed.number).to.be(1337);
  });

  describe('once saved', function() {
    beforeEach(function() {
      mySavedModel.save();
    });

    afterEach(function() {
      root.localStorage.clear();
    });

    it('can fetch from localStorage', function() {
      const newModel = new SavedModel({
        id: 10
      });

      newModel.fetch();

      expect(newModel.get('string')).to.be('String');
      expect(newModel.get('string2')).to.be('String 2');
      expect(newModel.get('number')).to.be(1337);
    });
  });
});


describe('LocalStorage Collection', function() {
  let mySavedCollection;

  beforeEach(function() {
    mySavedCollection = new SavedCollection();
  });

  afterEach(function() {
    mySavedCollection = null;
    root.localStorage.clear();
  });

  it('saves to localStorage', function() {
    mySavedCollection.create(attributes);
    expect(mySavedCollection.length).to.be(1);
  });

  describe('pulling from localStorage', function() {
    let model;
    let item;

    beforeEach(function() {
      model = mySavedCollection.create(attributes);
      const id = model.id;
      item = root.localStorage.getItem(`SavedCollection-${id}`);
    });

    afterEach(function() {
      model = item = null;
    });

    it('saves into the localStorage', function() {
      expect(item).to.not.be(null);
    });

    it('saves the right data', function() {
      const parsed = JSON.parse(item);
      expect(parsed.string).to.be('String');
    });

    it('can fetch a new value from localStorage', function() {
      const newCollection = new SavedCollection();
      newCollection.fetch();

      console.log(root.localStorage)
      expect(newCollection.length).to.be(1);
    });
  });
});
