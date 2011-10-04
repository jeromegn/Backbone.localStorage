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
    
    test("should not try to load items from localstorage if they are not there anymore", function() {
        library.create(attrs);
        localStorage.clear();
        library.fetch();
        equals(0, library.length);
    });
    
    test("should load from session store without server request", function() {
        library.create(attrs);
        
        secondLibrary = new Library();
        secondLibrary.fetch();
        equals(1, secondLibrary.length);
    });
    
});