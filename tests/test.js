$(document).ready(function() {
    module("localStorage");

    var Library = Backbone.Collection.extend({
        localStorage: new window.Store("libraryStore")
        
        // is the problem with my library that is has no model reference?
    });

    var library = new Library();

    var attrs = {
        title  : 'The Tempest',
        author : 'Bill Shakespeare',
        length : 123
    };
    
    // Make sure there is no library collection when we start
    
    var killStorage = function (name) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(name) !== -1) {
                localStorage.removeItem(key);
            }
        }
            
    };

    // read from the library object that shouldn't exist when we start
    test("collection", function() {
        killStorage('libraryStore');
        library.fetch();
        equals(library.length, 0, 'empty read');
        
        library.create(attrs);
        equals(library.length, 1, 'one item added');
        equals(library.first().get('title'), 'The Tempest', 'title was read');
        equals(library.first().get('author'), 'Bill Shakespeare', 'author was read');
        equals(library.first().get('length'), 123, 'length was read');

        library.first().save({id: '1-the-tempest', author: 'William Shakespeare'});
        equals(library.first().get('id'), '1-the-tempest', 'verify ID update');
        equals(library.first().get('title'), 'The Tempest', 'verify title is still there');
        equals(library.first().get('author'), 'William Shakespeare', 'verify author update');
        equals(library.first().get('length'), 123, 'verify length is still there');
        library.each(function(book) {
            book.destroy();
        });
        equals(library.length, 0, 'item was destroyed and library is empty');
    });
});
