var Books = require('../collections/Books')

var PickBooks = Backbone.View.extend({

    el: $('#content'),

    initialize: function(){
        _.bindAll(this, 'render', 'fetchSuccess', 'fetchError')

        this.collection = new Books()
        this.collection.fetch({
            success: this.fetchSuccess,
            error: this.fetchError
        })
        this.render()
    },
    
    fetchSuccess: function (collection, response) {
        this.books = response
        this.render()
    },

    fetchError: function () {
        this.books = []
        this.render()
    },
    
    render: function() {
        var template = require('../templates/loader.html'),
            templateVariables = {}
        
        if(this.books) {      
            if(this.books.length > 0) {
                template = require('../templates/books.html')
                templateVariables = { books: this.books }
            } else {
                template = require('../templates/booksNotFound.html')
            }
        }
        
        this.$el.html(_.template(template)(templateVariables))
    }

})

module.exports = PickBooks