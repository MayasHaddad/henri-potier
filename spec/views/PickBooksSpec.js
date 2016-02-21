var fs = require('fs')
describe('PickBooks', function () {
    var Book = require('../../src/models/Book.js'),
        PickBooks = require('../../src/views/PickBooks.js'),
        pickBooks,
        Cart = require('../../src/models/Cart.js'),
        cart

    PickBooks.prototype.loadTemplates = function () {
        this.loaderTemplate = fs.readFileSync('./src/templates/loader.html', 'utf8')
        this.booksTemplate = fs.readFileSync('./src/templates/books.html', 'utf8')
        this.pickBooksTemplate = fs.readFileSync('./src/templates/PickBooks.html', 'utf8')
        this.booksNotFoundTemplate = fs.readFileSync('./src/templates/booksNotFound.html', 'utf8')
    }

    describe('Pickbooks view', function () {

        describe('when calling syncUIBooksListWithPreviousCart method', function () {
            beforeEach(function () {
                cart = new Cart()

                PickBooks.prototype.initBooks = function () {
                    this.books = [
                        {
                            isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff',
                            title: 'Henri Potier à l\'école des sorciers',
                            price: 35,
                            cover: 'http://henri-potier.xebia.fr/hp0.jpg'
                        },
                        {
                            isbn: 'a460afed-e5e7-4e39-a39d-c885c05db861',
                            title: 'Henri Potier et la Chambre des secrets',
                            price: 30,
                            cover: 'http://henri-potier.xebia.fr/hp1.jpg'
                        },
                        {
                            isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc',
                            title: 'Henri Potier et le Prisonnier d\'Azkaban',
                            price: 30,
                            cover: 'http://henri-potier.xebia.fr/hp2.jpg'
                        }]
                }

                pickBooks = new PickBooks(cart)
            })

            describe('after adding a book to cart', function () {

                it('should return value', function () {

                    var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 0 })
                    cart.addBookToCart(book1)
                    expect(_.findWhere(pickBooks.syncUIBooksListWithPreviousCart(), { isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff' }).hiddenAddBtn).toEqual('hidden-btn')
                    expect(_.findWhere(pickBooks.syncUIBooksListWithPreviousCart(), { isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff' }).hiddenRemoveBtn).toEqual('')
                })
            })

            describe('after adding another book to cart', function () {

                it('should return value', function () {

                    var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 0 })
                    cart.addBookToCart(book1)
                    expect(_.findWhere(pickBooks.syncUIBooksListWithPreviousCart(), { isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc' }).hiddenAddBtn).toEqual('')
                    expect(_.findWhere(pickBooks.syncUIBooksListWithPreviousCart(), { isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc' }).hiddenRemoveBtn).toEqual('hidden-btn')
                })
            })
            
            describe('when not adding', function () {

                it('should return value', function () {
                    expect(_.findWhere(pickBooks.syncUIBooksListWithPreviousCart(), { isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff' }).hiddenAddBtn).toEqual('')
                    expect(_.findWhere(pickBooks.syncUIBooksListWithPreviousCart(), { isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff' }).hiddenRemoveBtn).toEqual('hidden-btn')
                })
            })
        })
    })
})