describe('Cart', function () {
    var Cart = require('../../src/models/Cart.js'),
        cart

    beforeEach(function () {
        cart = new Cart()
    })

    describe('Cart model', function () {

        describe('when instantiated', function () {

            it('should exhibit attributes', function () {
                expect(cart.get('isbnList').length).toEqual(0)
            })
        })

        describe('after adding some books', function () {

            it('should exhibit attributes', function () {
                cart.addBookToCart('c8fabf68-8374-48fe-a7ea-a00ccd07afff')
                cart.addBookToCart('a460afed-e5e7-4e39-a39d-c885c05db861')
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc')
                
                expect(cart.get('isbnList').length).toEqual(3)
            })
        })
        
        describe('in case the same book was added twice', function () {

            it('should exhibit attributes', function () {
                cart.addBookToCart('c8fabf68-8374-48fe-a7ea-a00ccd07afff')
                cart.addBookToCart('a460afed-e5e7-4e39-a39d-c885c05db861')
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc')
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc')
                
                expect(cart.get('isbnList').length).toEqual(3)
            })
        })
        
        describe('after adding some isbns', function () {

            it('to string should return', function () {
                cart.addBookToCart('c8fabf68-8374-48fe-a7ea-a00ccd07afff')
                cart.addBookToCart('a460afed-e5e7-4e39-a39d-c885c05db861')
                cart.addBookToCart('fcd1e6fa-a63f-4f75-9da4-b560020b6acc')
                console.log(cart.toString())
                expect(cart.toString()).toEqual('c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861,fcd1e6fa-a63f-4f75-9da4-b560020b6acc')
            })
        })
    })
})