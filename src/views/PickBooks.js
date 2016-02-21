var Books = require('../collections/Books')

var PickBooks = Backbone.View.extend({

    el: $('#content'),

    initialize: function (cart) {
        _.bindAll(this, 'render', 'initBooks', 'loadTemplates',
            'goToProceed', 'addBookToCart', 'removeBookFromCart',
            'syncUIBooksListWithPreviousCart')

        this.collection = new Books()
        this.cart = cart

        this.loadTemplates()
        this.initBooks()

        this.render()
    },

    events: {
        'click .add-book-to-cart-btn': 'addBookToCart',
        'click .remove-book-from-cart-btn': 'removeBookFromCart',
        'click #go-to-proceed-btn': 'goToProceed'
    },

    initBooks: function () {
        var self = this

        this.collection.deferred.done(function (collection, response) {
            if (response === 'success') {
                self.books = self.collection.toJSON()
            }

            self.books = self.syncUIBooksListWithPreviousCart()
            self.render()
        })

        this.collection.deferred.fail(function () {
            self.books = []
            self.render()
        })
    },

    loadTemplates: function () {
        this.loaderTemplate = require('../templates/loader.html')
        this.breadcrumbTemplate = require('../templates/breadcrumb.html')
        this.booksTemplate = require('../templates/books.html')
        this.pickBooksTemplate = require('../templates/PickBooks.html')
        this.booksNotFoundTemplate = require('../templates/booksNotFound.html')
    },

    goToProceed: function (event) {
        if (this.cart.get('books').length > 0) {
            window.location.hash = 'proceed'
        }
        event.preventDefault()
    },

    addBookToCart: function (event) {
        var id = this.$(event.currentTarget).data('id'),
            book = this.collection.where({ isbn: this.$('#isbn-' + id).text().trim() })[0]

        this.cart.addBookToCart(book)
        this.$(event.currentTarget).hide()
        this.$('#' + 'remove-book-' + id).show()
        event.preventDefault()
    },

    removeBookFromCart: function (event) {
        var id = this.$(event.currentTarget).data('id'),
            book = this.collection.where({ isbn: this.$('#isbn-' + id).text().trim() })[0]

        this.cart.removeBookFromCart(book)
        this.$(event.currentTarget).hide()
        this.$('#' + 'add-book-' + id).show()
        event.preventDefault()
    },

    syncUIBooksListWithPreviousCart: function () {
        var self = this
        return _.map(this.books, function (book) {
            var bookPickedInPreviousCart = _.findWhere(self.cart.get('books'), { isbn: book.isbn })

            if (bookPickedInPreviousCart) {
                book.hiddenAddBtn = 'hidden-btn'
                book.hiddenRemoveBtn = ''
            } else {
                book.hiddenAddBtn = ''
                book.hiddenRemoveBtn = 'hidden-btn'
            }
            return book
        })
    },

    render: function () {
        var template = this.loaderTemplate,
            templateVariables = {}

        if (this.books) {
            if (this.books.length > 0) {
                var booksTemplate = _.template(this.booksTemplate)({ books: this.books }),
                    breadcrumbTemplate = _.template(this.breadcrumbTemplate)({ breadcrumbElements: ['Je choisis mes livres'] })
                template = this.pickBooksTemplate
                templateVariables = { booksTemplate: booksTemplate, breadcrumbTemplate: breadcrumbTemplate }
            } else {
                template = this.booksNotFoundTemplate
            }
        }

        this.$el.html(_.template(template)(templateVariables))
    }
})

module.exports = PickBooks