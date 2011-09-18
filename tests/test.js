$(document).ready(function() {
    module("localStorage");
    
    // Clear localStorage of all test store values before defining collection/model
    killStorage('TheTempest');
    killStorage('libraryStore');
    
    var Book = Backbone.Model.extend({
        defaults: {
            title  : 'The Tempest',
            author : 'Bill Shakespeare',
            length : 123
        }
    });
    
    var BookSynced = Book.extend({
        initialize: function() {
            this.localKey = this.get('title').replace(/\s/g, '');
            this.localStorage = new window.Store(this.localKey);
        }
    });

    var Library = Backbone.Collection.extend({
        model: Book,
        localStorage: new window.Store("libraryStore")
    });

    // Make sure there is no library collection when we start

    function killStorage(name) {
        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);
            if (key.indexOf(name) !== -1) {
                localStorage.removeItem(key);
            }
        }
    };
    
    var library = new Library();
    
    var book = new BookSynced();

    test("Collection: localSync", function() {
        // read from the library object that shouldn't exist when we start
        library.fetch();
        equals(library.length, 0, 'empty read');

        library.create();
        
        // Set, but don't save
        library.first().set({ 'title': "Wombat's Fun Adventure" });
        equals(library.first().get('title'), "Wombat's Fun Adventure", 'title changed, but not saved');
        
        library.fetch();
        
        // Create
        equals(library.length, 1, 'created model');

        // Read, set title above should be discarded
        equals(library.first().get('title'), 'The Tempest', 'title was read');
        equals(library.first().get('author'), 'Bill Shakespeare', 'author was read');
        equals(library.first().get('length'), 123, 'length was read');

        // Update
        library.first().save({ author: 'William Shakespeare'});
                
        // Fetch to make sure new values persisted
        library.fetch();
        
        equals(library.first().get('author'), 'William Shakespeare', 'verify author update');
        equals(library.first().get('title'), 'The Tempest', 'verify title is still there');
        equals(library.first().get('length'), 123, 'verify length is still there');
        
        // Delete
        library.each(function(book) {
            book.destroy();
        });

        library.fetch();
        
        equals(library.length, 0, 'item was destroyed and library is empty');
    });
    
    test("Model: localSync", function() {
        // Write to localStorage/store
        book.save();
        
        equals(book.get('title'), 'The Tempest', 'model created');
        
        // Set, but don't save
        book.set({ 'title': "Wombat's Fun Adventure" });
        equals(book.get('title'), "Wombat's Fun Adventure", 'title changed, but not saved');
        
        book.fetch();
        
        // Read, the unsaved title value above should be discarded
        equals(book.get('title'), 'The Tempest', 'read from store successful')
        
        // Update
        book.save({ author: 'William Shakespeare'});
        book.fetch();
        equals(book.get('author'), 'William Shakespeare', 'author successfully updated');
        equals(book.get('length'), 123, 'verify length is still there');
        
        // Delete
        book.destroy();
        
    });

});