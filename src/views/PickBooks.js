var Books = require('../collections/Books')

var PickBooks = Backbone.View.extend({

    el: $('#content'),

    initialize: function () {
        _.bindAll(this, 'render')

        this.collection = new Books()

        var self = this

        this.collection.deferred.done(function (collection, response) {
            self.books = []

            if (response === 'success') {
                self.books = self.collection.toJSON()
            }

            self.render()
        })

        this.render()
    },

    render: function () {
        var template = require('../templates/loader.html'),
            templateVariables = {}

        if (this.books) {
            if (this.books.length > 0) {
                var booksTemplate = _.template(require('../templates/books.html'))({ books: this.books })
                template = require('../templates/PickBooks.html')
                templateVariables = { booksTemplate: booksTemplate }
            } else {
                template = require('../templates/booksNotFound.html')
            }
        }

        this.$el.html(_.template(template)(templateVariables))
    }
})

module.exports = PickBooks