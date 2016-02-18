describe('Cart', function () {
    var Cart = require('../../src/models/Cart.js'),
        cart

    describe('Cart model', function () {

        beforeEach(function () {
            cart = new Cart()
        })

        describe('when instantiated', function () {

            it('should exhibit attributes', function () {
                expect(cart.get('isbnList').length).toEqual(0)
            })
        })

        describe('after adding some books', function () {

            it('should exhibit attributes', function () {
                cart.addBookToCart('c8fabf68-8374-48fe-a7ea-a00ccd07afff', 0)
                cart.addBookToCart('a460afed-e5e7-4e39-a39d-c885c05db861', 0)
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc', 0)

                expect(cart.get('isbnList').length).toEqual(3)
            })
        })

        describe('in case the same book was added twice', function () {

            it('should exhibit attributes', function () {
                cart.addBookToCart('c8fabf68-8374-48fe-a7ea-a00ccd07afff', 0)
                cart.addBookToCart('a460afed-e5e7-4e39-a39d-c885c05db861', 0)
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc', 0)
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc', 0)

                expect(cart.get('isbnList').length).toEqual(3)
            })
        })

        describe('after adding some books', function () {

            it('to string should return', function () {
                cart.addBookToCart('c8fabf68-8374-48fe-a7ea-a00ccd07afff', 0)
                cart.addBookToCart('a460afed-e5e7-4e39-a39d-c885c05db861', 0)
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc', 0)

                expect(cart.toString()).toEqual('c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861,fcd1e6fa-a63f-4f75-9da4-b560020b6acc')
            })
        })

        describe('after adding some books', function () {

            it('total price should be sum of books prices', function () {
                cart.addBookToCart('c8fabf68-8374-48fe-a7ea-a00ccd07afff', 14)
                cart.addBookToCart('a460afed-e5e7-4e39-a39d-c885c05db861', 50)
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc', 70.9)

                expect(cart.get('totalPrice')).toEqual(134.9)
            })
        })
    })
})