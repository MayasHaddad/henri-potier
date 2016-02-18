var Cart = Backbone.Model.extend({
    defaults: {
        isbnList: [],
        totalPrice: 0
    },

    initialize: function () {
        _.bindAll(this, 'addBookToCart')
    },

    addBookToCart: function (isbn, bookPrice) {
        var isbnList = _.clone(this.get('isbnList'))
        if (isbnList.indexOf(isbn) < 0) {
            isbnList.push(isbn)
            var currentTotalPrice = this.get('totalPrice')
            
            this.set({ isbnList: isbnList, totalPrice: currentTotalPrice + bookPrice })
        }
    },

    toString: function () {
        return _.reduce(this.get('isbnList'), function (memo, isbn) { return memo + ',' + isbn }, '').substr(1)
    }
})

module.exports = Cart