import root from 'window-or-global';
import Bb from 'backbone';
import {LocalStorage} from 'backbone.localStorage';
import {clone, uniq} from 'underscore';

import expect from 'expect.js';
import {stub} from 'sinon';

const attributes = {
  string: 'String',
  string2: 'String 2',
  number: 1337
};

const SavedModel = Bb.Model.extend({
  localStorage: new LocalStorage('SavedModel'),
  defaults: attributes,

  urlRoot: '/test/'
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

  it('can be converted to JSON', function() {
    expect(mySavedModel.toJSON()).to.eql({
      string: 'String',
      id: 10,
      number: 1337,
      string2: 'String 2'
    });
  });

  describe('if not saved', function() {
    it('will pass error callbacks from fetch', function(done) {
      mySavedModel.fetch({
        error(model, resp) {
          expect(model).to.equal(mySavedModel);
          expect(resp).to.equal('Record Not Found');
          done();
        }
      });
    });
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

    it('passes fetch calls to success', function(done) {
      mySavedModel.fetch({
        success(model, response, options) {
          expect(model).to.equal(mySavedModel);
          done();
        }
      });
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

    it('saves to localStorage with patch', function() {
      mySavedModel.save({
        string: 'New String',
        number2: 1234
      }, {patch: true});

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

  describe('using ajaxSync: true', function() {
    beforeEach(function() {
      stub(Bb, 'ajax');
    });

    afterEach(function() {
      Bb.ajax.restore();
    });

    it('calls $.ajax for fetch', function() {
      mySavedModel.fetch({ajaxSync: true});

      expect(Bb.ajax.called).to.be(true);
      expect(Bb.ajax.getCall(0).args[0].url).to.be('/test/10');
      expect(Bb.ajax.getCall(0).args[0].type).to.be('GET');
    });

    it('calls $.ajax for save', function() {
      mySavedModel.save({}, {ajaxSync: true});

      expect(Bb.ajax.called).to.be(true);
      expect(Bb.ajax.getCall(0).args[0].type).to.be('PUT');
      expect(Bb.ajax.getCall(0).args[0].url).to.be('/test/10');

      const data = JSON.parse(Bb.ajax.getCall(0).args[0].data);

      expect(data).to.eql({
        string: 'String',
        string2: 'String 2',
        number: 1337,
        id: 10
      });
    });
  });

  describe('using $.Deferred', function() {
    const deferredResolver = {
      resolve: stub(),
      promise: stub()
    };
    const $Deferred = Bb.$.Deferred;

    function deferred() {
      return deferredResolver;
    }
    beforeEach(function() {
      Bb.$.Deferred = deferred;
    });

    afterEach(function() {
      Bb.$.Deferred = $Deferred;
    });

    it('resolves the deferred promise', function() {
      mySavedModel.save();
      expect(deferredResolver.resolve.called).to.be(true);
      expect(deferredResolver.promise.called).to.be(true);
    });
  });

  describe('using Backbone.Deferred', function() {
    const deferredResolver = {
      resolve: stub(),
      promise: stub()
    };
    const $ = Bb.$;
    const Deferred = Bb.Deferred;

    function deferred() {
      return deferredResolver;
    }

    before(function() {
      Bb.$ = undefined;
      Bb.Deferred = deferred;
    });

    after(function() {
      Bb.$ = $;
      Bb.Deferred = Deferred;
    });

    it('resolves the deferred promise', function() {
      mySavedModel.save();
      expect(deferredResolver.resolve.called).to.be(true);
      expect(deferredResolver.promise.called).to.be(true);
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

    expect(newModel.id).to.be(1337);
    expect(newModel.get('string')).to.be('String');
  });
});


describe('New localStorage model', function() {
  let mySavedModel;

  beforeEach(function() {
    mySavedModel = new SavedModel();
  });

  afterEach(function() {
    root.localStorage.clear();
    mySavedModel = null;
  });

  it('creates a new item in localStorage', function() {
    mySavedModel.save({
      data: 'value'
    });

    const itemId = mySavedModel.id;
    const item = root.localStorage.getItem(`SavedModel-${itemId}`);

    const parsed = JSON.parse(item);

    expect(parsed).to.eql(mySavedModel.attributes);
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

  it('cannot duplicate id in localStorage', function() {
    const item = clone(attributes);
    item.id = 5;

    const newCollection = new SavedCollection([item]);
    newCollection.create(item);
    newCollection.create(item);
    const localItem = root.localStorage.getItem('SavedCollection-5');

    expect(newCollection.length).to.be(1);
    expect(JSON.parse(localItem).id).to.be(5);

    const records = newCollection.localStorage.records;
    expect(uniq(records)).to.eql(records);
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
