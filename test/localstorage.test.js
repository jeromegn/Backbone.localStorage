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

const DifferentIdAttribute = Bb.Model.extend({
  localStorage: new LocalStorage('DifferentId'),
  idAttribute: 'number'
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

    it('can be updated', function() {
      mySavedModel.save({
        string: 'New String',
        number2: 1234
      });

      expect(mySavedModel.pick('string', 'number2')).to.eql({
        string: 'New String', 'number2': 1234
      });
    });

    it('persists its update to localStorage', function() {
      mySavedModel.save({
        string: 'New String',
        number2: 1234
      });

      const item = root.localStorage.getItem(`SavedModel-${mySavedModel.id}`);

      expect(item).to.not.be(null);

      const parsed = JSON.parse(item);

      expect(parsed).to.eql({
        string: 'New String',
        string2: 'String 2',
        id: 10,
        number: 1337,
        number2: 1234
      });
    });

    it('can be destroyed', function() {
      mySavedModel.destroy();

      const item = root.localStorage.getItem('SavedModel-10');
      expect(item).to.be(null);
    });
  });
});


describe('Model with different idAttribute', function() {
  let mySavedModel;

  beforeEach(function() {
    mySavedModel = new DifferentIdAttribute(attributes);
  });

  afterEach(function() {
    mySavedModel = null;
    root.localStorage.clear();
  });

  it('saves using the new value', function() {
    mySavedModel.save();
    const item = root.localStorage.getItem('DifferentId-1337');
    const parsed = JSON.parse(item);

    expect(item).to.not.be(null);
    expect(parsed.string).to.be('String');
  });

  it('fetches using the new value', function() {
    root.localStorage.setItem('DifferentId-1337', JSON.stringify(attributes));
    const newModel = new DifferentIdAttribute({number: 1337});

    newModel.fetch();
    Bb.sync('read', newModel, {});
    expect(newModel.id).to.be(1337);
    expect(newModel.get('string')).to.be('String');
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
      expect(parsed.id).to.equal(model.id);
      expect(parsed.string).to.be('String');
    });

    it('reads from localStorage', function() {
      const newCollection = new SavedCollection();
      newCollection.fetch();

      expect(newCollection.length).to.be(1);

      const newModel = newCollection.at(0);
      expect(newModel.get('string')).to.be('String');
    });

    it('destroys models and removes from collection', function() {
      const parsed = JSON.parse(item);
      const newModel = mySavedCollection.get(parsed.id);
      newModel.destroy();

      const removed = root.localStorage.getItem(`SavedCollection-${parsed.id}`);

      expect(removed).to.be(null);
      expect(mySavedCollection.length).to.be(0);
    });
  });
});
