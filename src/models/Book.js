var Book = Backbone.Model.extend({
    defaults: {
        isbn: '',
        title: '',
        price: 0,
        cover: ''
    }
})

module.exports = Book