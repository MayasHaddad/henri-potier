var Cart = Backbone.Model.extend({
    defaults: {
        books: [],
        totalPrice: 0
    },

    initialize: function () {
        _.bindAll(this, 'addBookToCart', 'toString')
    },

    addBookToCart: function (book) {
        var books = _.clone(this.get('books'))
        if (!_.find(books, { isbn: book.get('isbn') })) {
            books.push(book.toJSON())
            var currentTotalPrice = this.get('totalPrice')

            this.set({ books: books, totalPrice: currentTotalPrice + book.get('price') })
        }
    },

    toString: function () {
        var isbnList = _.pluck(this.get('books'), 'isbn')

        return _.reduce(isbnList, function (memo, isbn) { return memo + ',' + isbn }, '').substr(1)
    }
})

module.exports = Cart