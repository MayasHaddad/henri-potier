describe('Cart', function () {
    var Cart = require('../../src/models/Cart.js'),
        Book = require('../../src/models/Book.js'),
        cart

    describe('Cart model', function () {

        beforeEach(function () {
            cart = new Cart()
        })

        describe('when instantiated', function () {

            it('should exhibit attributes', function () {
                expect(cart.get('books').length).toEqual(0)
            })
        })

        describe('after adding some books', function () {

            it('should exhibit attributes', function () {
                var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 0 })
                cart.addBookToCart(book1)
                var book2 = new Book({ isbn: 'a460afed-e5e7-4e39-a39d-c885c05db861', price: 0 })
                cart.addBookToCart(book2)
                var book3 = new Book({ isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc', price: 0 })
                cart.addBookToCart(book3)

                expect(cart.get('books').length).toEqual(3)
            })
        })

        describe('in case the same book was added twice', function () {

            it('should exhibit attributes', function () {
                var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 0 })
                cart.addBookToCart(book1)
                var book2 = new Book({ isbn: 'a460afed-e5e7-4e39-a39d-c885c05db861', price: 0 })
                cart.addBookToCart(book2)
                var book3 = new Book({ isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc', price: 0 })
                cart.addBookToCart(book3)
                var book4 = new Book({ isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc', price: 0 })
                cart.addBookToCart(book4)

                expect(cart.get('books').length).toEqual(3)
            })
        })

        describe('after adding some books', function () {

            it('to string should return', function () {
                var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 0 })
                cart.addBookToCart(book1)
                var book2 = new Book({ isbn: 'a460afed-e5e7-4e39-a39d-c885c05db861', price: 0 })
                cart.addBookToCart(book2)
                var book3 = new Book({ isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc', price: 0 })
                cart.addBookToCart(book3)

                expect(cart.toString()).toEqual('c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861,fcd1e6fa-a63f-4f75-9da4-b560020b6acc')
            })
        })

        describe('after adding one book', function () {

            it('to string should return', function () {
                var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 0 })
                cart.addBookToCart(book1)

                expect(cart.toString()).toEqual('c8fabf68-8374-48fe-a7ea-a00ccd07afff')
            })
        })

        describe('before adding any book', function () {

            it('to string should return', function () {
                expect(cart.toString()).toEqual('')
            })
        })

        describe('after adding some books', function () {

            it('total price should be sum of books prices', function () {

                var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 14 })
                cart.addBookToCart(book1)
                var book2 = new Book({ isbn: 'a460afed-e5e7-4e39-a39d-c885c05db861', price: 50 })
                cart.addBookToCart(book2)
                var book3 = new Book({ isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc', price: 70.9 })
                cart.addBookToCart(book3)

                expect(cart.get('totalPrice')).toEqual(134.9)
            })
        })
    })
})