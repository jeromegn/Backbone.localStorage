describe("Backbone.localStorage in CommonJS environment", function() {

  var LocalStorage = require("../backbone.localStorage");
  var Backbone = require("backbone");

  it("should be the same as the non-CommonJS usage", function(){
    assert.equal(Backbone.LocalStorage, LocalStorage);
  });
});
