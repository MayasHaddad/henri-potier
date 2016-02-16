var Book = require('../models/Book')

var Books = Backbone.Collection.extend({

    model: Book,
    
    url: 'http://henri-potier.xebia.fr/books'

})

module.exports = Books