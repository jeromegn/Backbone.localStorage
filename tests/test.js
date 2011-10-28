$(document).ready(function() {
    module("localStorage");

    var Book = Backbone.Model.extend({
    });

    var store1 = new window.Store('libraryStore');
    var store2 = new window.Store('libraryStore');

    var Library = Backbone.Collection.extend({
        localStorage: store1,
        model: Book
    });

    var library = new Library();
    var library2 = new Library();
    library2.localStorage = store2;

    var attrs = {
        title  : 'The Tempest',
        author : 'Bill Shakespeare',
        length : 123
    };

    var book = new Book(attrs);
    
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

        equals(store1 === store2, false, 'different Store instances');
        store1.create(book);
        equals(JSON.stringify(store2.find(book)), JSON.stringify(book), 'item added to one instance of Store is found in all instances');

        killStorage('libraryStore');

        library.create(attrs);
        equals(library.length, 1, 'one item added');
        library2.fetch();
        equals(library2.length, 1, 'item added elsewhere is fetched here');
        equals(JSON.stringify(library.first()), JSON.stringify(library2.first()), 'different libraries have the same data');

        library2.first().save({author: 'William Shakespeare'});
        library.fetch();
        equals(library.first().get('author'), 'William Shakespeare', 'model updates across different libraries with the same store');

        library2.first().destroy();
        library.fetch();
        equals(library.length, 0, 'item destroyed elsewhere is gone from here');
    });
});
