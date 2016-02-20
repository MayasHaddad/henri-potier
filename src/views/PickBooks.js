var Books = require('../collections/Books')

var PickBooks = Backbone.View.extend({

    el: $('#content'),

    initialize: function (cart) {
        _.bindAll(this, 'render')

        this.collection = new Books()
        this.cart = cart

        var self = this

        this.collection.deferred.done(function (collection, response) {
            if (response === 'success') {
                self.books = self.collection.toJSON()
            }

            self.render()
        })

        this.collection.deferred.fail(function () {
            self.books = []
            self.render()
        })

        this.render()
    },

    events: {
        'click .add-book-to-cart-btn': 'addBookToCart',
        'click #go-to-proceed-btn': 'goToProceed'
    },

    goToProceed: function () {
        window.location.href = '/#proceed'
    },

    addBookToCart: function (event) {
        var id = $(event.currentTarget).data('id'),
            book = this.collection.where({ isbn: $('#isbn-' + id).text() })[0]

        this.cart.addBookToCart(book)
        $(event.currentTarget).hide()
        $('#' + 'remove-book-' + id).show()
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