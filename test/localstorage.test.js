import root from 'window-or-global';
import Bb from 'backbone';
import {LocalStorage} from 'backbone.localstorage';

import expect from 'expect.js';


describe('LocalStorage Model', function() {
  const SavedModel = Bb.Model.extend({
    localStorage: new LocalStorage('SavedModel')
  });
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
    mySavedModel.save({data: 'value'});
    const item = root.localStorage.getItem('SavedModel-10');
    const parsed = JSON.parse(item);

    expect(parsed.id).to.be(10);
    expect(parsed.data).to.be('value')
  })
});
