

describe("Backbone.localStorage", function(){

  var attributes = {
    string: "String",
    string2: "String 2",
    number: 1337
  };

  describe("on a Collection", function(){

    var Model = Backbone.Model.extend({
      defaults: attributes
    });

    var Collection = Backbone.Collection.extend({
      model: Model,
      localStorage: new Backbone.LocalStorage("collectionStore")
    });

    var collection = new Collection();


    // Clean up before starting
    before(function(){
      window.localStorage.clear();
    });

    before(function(){
      collection.fetch();
    });

    it("should use `localSync`", function(){
      assert.equal(Backbone.getSyncMethod(collection), Backbone.localSync);
    });

    it("should initially be empty", function(){
      assert.equal(collection.length, 0);
    });


    describe("create", function(){
      
      var model;

      before(function(){
        model = collection.create({});
      });

      it("should have 1 model", function(){
        assert.equal(collection.length, 1);
      });

      it("should have a populated model", function(){
        var withId = _.clone(attributes);
        withId.id = model.id;
        assert.deepEqual(model.toJSON(), withId);
      });

      it("should have assigned an `id` to the model", function(){
        assert.isDefined(model.id);
      });

    });

    describe("get (by `id`)", function(){
      
      var model;

      before(function(){
        model = collection.create({});
      });

      it("should find the model with its `id`", function(){
        assert.equal(collection.get(model.id), model);
      });

    });
  
    describe("instances", function(){

      describe("save", function(){

        var model, model2;

        before(function(){
          model = collection.create({});
          model.save({string: "String 0"});
          collection.fetch()
        });

        it("should persist the changes", function(){
          assert.equal(model.get("string"), "String 0");
        });


        describe("with a new `id`", function(){

          before(function(){
            model2 = collection.create({});
            model2.save({id: 1});
            collection.fetch();
          });

          it("should have a new `id`", function(){
            assert.equal(model2.id, 1);
          });

          it("should have kept its old properties", function(){
            var withId = _.clone(attributes);
            withId.id = 1;
            assert.deepEqual(model2.toJSON(), withId);
          });

        });


      });

      describe("destroy", function(){
        
        var beforeFetchLength, afterFetchLength;

        before(function(){
          // Make sure there's at least items in there
          // ... can't rely on previous tests
          _(5).times(function(){
            collection.create()
          });
        });

        before(function(){
          _.each(collection.toArray(), function(model){
            model.destroy();
          });
          beforeFetchLength = collection.length;
        });

        before(function(){
          collection.fetch();
          afterFetchLength = collection.length;
        });

        it("should have removed all items from the collection", function(){
          assert.equal(beforeFetchLength, 0);
        });

        it("should have removed all items from the store", function(){
          assert.equal(afterFetchLength, 0);
        });

      });

      describe("with a different `idAttribute`", function(){
        
        var Model2 = Backbone.Model.extend({
          defaults: attributes,
          idAttribute: "_id"
        });

        var Collection2 = Backbone.Collection.extend({
          model: Model2,
          localStorage: new Backbone.LocalStorage("collection2Store")
        });

        var collection2 = new Collection2();

        before(function(){
          collection2.create();
        });

        it("should have used the custom `idAttribute`", function(){
          assert.equal(collection2.first().id, collection2.first().get("_id"));
        });

      });

    });

  });

  describe("on a Model", function(){

    var Model = Backbone.Model.extend({
      defaults: attributes,
      localStorage: new Backbone.LocalStorage("modelStore")
    });

    var model = new Model();

    before(function(){
      window.localStorage.clear();
    });

    it("should use `localSync`", function(){
      assert.equal(Backbone.getSyncMethod(model), Backbone.localSync);
    });

    describe("save", function(){

      before(function(){
        model.save();
        model.fetch();
      });

      it("should be saved in the store", function(){
        assert.isDefined(model.id);
      });

      describe("with new attributes", function(){
        
        before(function(){
          model.save({number: 42});
          model.fetch();
        });

        it("should persist the changes", function(){
          assert.deepEqual(model.toJSON(), _.extend(_.clone(attributes), {id: model.id, number: 42}));
        });

      });

    });

    describe("destroy", function(){
      
      before(function(){
        model.destroy();
      });

      it("should have removed the instance from the store", function(){
        assert.lengthOf(Model.prototype.localStorage.findAll(), 0);
      });

    });

  });

  describe("Error handling", function(){

    var Model = Backbone.Model.extend({
      defaults: attributes,
      localStorage: new Backbone.LocalStorage("modelStore")
    });

    before(function(){
      window.localStorage.clear();
    });

    describe("private browsing", function(){

      var model = new Model()
        , oldSetItem = window.localStorage.setItem

      before(function(){
        window.localStorage.setItem = function(){
          var error = new Error();
          error.code = DOMException.QUOTA_EXCEEDED_ERR;
          throw error;
        };
      });

      var error;

      before(function(){
        model.save(attributes, {
          error: function(model, err){
            error = err;
          }
        })
      });

      it("should return the error in the error callback", function(){
        assert.equal(error, "Private browsing is unsupported");
      });

      after(function(){
        window.localStorage.setItem = oldSetItem;
      })

    });

  });


});

describe("Without Backbone.localStorage", function(){

  describe("on a Collection", function(){
    var Collection = Backbone.Collection.extend()
      , collection = new Collection();

    it("should use `ajaxSync`", function(){
      assert.equal(Backbone.getSyncMethod(collection), Backbone.ajaxSync);
    });
  });

  describe("on a Model", function(){
    var Model = Backbone.Model.extend()
      , model = new Model();

    it("should use `ajaxSync`", function(){
      assert.equal(Backbone.getSyncMethod(model), Backbone.ajaxSync);
    });
  });

});


// For some reason this is not ran when viewed in a browser
// but it is ran when using `mocha-phantomjs`.
describe("AMD", function(){

  require.config({
    paths: {
      jquery: "support/jquery",
      underscore: "support/underscore",
      backbone: "support/backbone",
      localstorage: "../backbone.localStorage"
    }
  });

  var LocalStorage;

  before(function(done){
    require(["localstorage"], function(LS){
      LocalStorage = LS;
      done()
    });
  });

  it("should be the same as the non-amd usage", function(){
    assert.equal(Backbone.LocalStorage, LocalStorage)
  });

});