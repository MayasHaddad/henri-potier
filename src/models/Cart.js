var Cart = Backbone.Model.extend({
    defaults: {
        isbnList: []
    },

    initialize: function () {
        _.bindAll(this, 'addBookToCart')
    },

    addBookToCart: function (isbn) {
        var isbnList = this.get('isbnList')
        if (isbnList.indexOf(isbn) < 0) {
            isbnList.push(isbn)
            this.set({ isbnList: isbnList })
        }
    }
})

module.exports = Cart