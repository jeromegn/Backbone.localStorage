describe("Backbone.browserStorage in CommonJS environment", function() {

  var BrowserStorage = require("../backbone.browserStorage");
  var Backbone = require("backbone");

  it("should be the same as the non-CommonJS usage", function(){
    assert.equal(Backbone.BrowserStorage, BRowserStorage);
  });
});
