$(document).ready(function() {
    var Library = Backbone.Collection.extend({
        localStorage: new window.Store("libraryStore")
        
        // is the problem with my library that is has no model reference?
    });

    var attrs = {
        title  : 'The Tempest',
        author : 'Bill Shakespeare',
        length : 123
    };
    
    var library = null;
    
    module("localStorage", {
        setup: function() {
            localStorage.clear();
            library = new Library();
        }
    });
    
    test("should be empty initially", function() {
        equals(library.length, 0, 'empty initially');
        library.fetch();
        equals(library.length, 0, 'empty read');
    });
    
    test("should create item", function() {
        library.create(attrs);
        equals(library.length, 1, 'one item added');
        equals(library.first().get('title'), 'The Tempest', 'title was read');
        equals(library.first().get('author'), 'Bill Shakespeare', 'author was read');
        equals(library.first().get('length'), 123, 'length was read');
    });
    
    test("should allow to change id", function() {
        library.create(attrs);
        library.first().save({id: '1-the-tempest', author: 'William Shakespeare'});
        equals(library.first().get('id'), '1-the-tempest', 'verify ID update');
        equals(library.first().get('title'), 'The Tempest', 'verify title is still there');
        equals(library.first().get('author'), 'William Shakespeare', 'verify author update');
        equals(library.first().get('length'), 123, 'verify length is still there');
    });
    
    test("should remove from collection", function() {
        library.create(attrs);
        library.each(function(book) {
            book.destroy();
        });
        equals(library.length, 0, 'item was destroyed and library is empty');
    });
    
        
    });
/*

  test("sync: update", function() {
    library.first().save({id: '1-the-tempest', author: 'William Shakespeare'});
    equals(lastRequest.url, '/library/1-the-tempest');
    equals(lastRequest.type, 'PUT');
    equals(lastRequest.dataType, 'json');
    var data = JSON.parse(lastRequest.data);
    equals(data.id, '1-the-tempest');
    equals(data.title, 'The Tempest');
    equals(data.author, 'William Shakespeare');
    equals(data.length, 123);
  });

  test("sync: update with emulateHTTP and emulateJSON", function() {
    Backbone.emulateHTTP = Backbone.emulateJSON = true;
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    equals(lastRequest.url, '/library/2-the-tempest');
    equals(lastRequest.type, 'POST');
    equals(lastRequest.dataType, 'json');
    equals(lastRequest.data._method, 'PUT');
    var data = JSON.parse(lastRequest.data.model);
    equals(data.id, '2-the-tempest');
    equals(data.author, 'Tim Shakespeare');
    equals(data.length, 123);
    Backbone.emulateHTTP = Backbone.emulateJSON = false;
  });

  test("sync: update with just emulateHTTP", function() {
    Backbone.emulateHTTP = true;
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    equals(lastRequest.url, '/library/2-the-tempest');
    equals(lastRequest.type, 'POST');
    equals(lastRequest.contentType, 'application/json');
    var data = JSON.parse(lastRequest.data);
    equals(data.id, '2-the-tempest');
    equals(data.author, 'Tim Shakespeare');
    equals(data.length, 123);
    Backbone.emulateHTTP = false;
  });

  test("sync: update with just emulateJSON", function() {
    Backbone.emulateJSON = true;
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    equals(lastRequest.url, '/library/2-the-tempest');
    equals(lastRequest.type, 'PUT');
    equals(lastRequest.contentType, 'application/x-www-form-urlencoded');
    var data = JSON.parse(lastRequest.data.model);
    equals(data.id, '2-the-tempest');
    equals(data.author, 'Tim Shakespeare');
    equals(data.length, 123);
    Backbone.emulateJSON = false;
  });

  test("sync: read model", function() {
    library.first().fetch();
    equals(lastRequest.url, '/library/2-the-tempest');
    equals(lastRequest.type, 'GET');
    ok(_.isEmpty(lastRequest.data));
  });



  test("sync: destroy with emulateHTTP", function() {
    Backbone.emulateHTTP = Backbone.emulateJSON = true;
    library.first().destroy();
    equals(lastRequest.url, '/library/2-the-tempest');
    equals(lastRequest.type, 'POST');
    equals(JSON.stringify(lastRequest.data), '{"_method":"DELETE"}');
    Backbone.emulateHTTP = Backbone.emulateJSON = false;
  });

  test("sync: urlError", function() {
    model = new Backbone.Model();
    raises(function() {
      model.fetch();
    });
    model.fetch({url: '/one/two'});
    equals(lastRequest.url, '/one/two');
  });
*/

});