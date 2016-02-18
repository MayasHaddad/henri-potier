var Cart = Backbone.Model.extend({
    defaults: {
        isbnList: []
    },

    initialize: function () {
        _.bindAll(this, 'addBookToCart')
    },

    addBookToCart: function (isbn) {
        var isbnList = this.get('isbnList')
        isbnList.push(isbn)
        this.set({ isbnList: isbnList })
    }
})

module.exports = Cart