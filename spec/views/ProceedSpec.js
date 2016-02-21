/* global beforeEach */
/* global expect */
/* global it */
/* global describe */
/* global spyOn */
var fs = require('fs')
describe('Proceed', function () {
    var Book = require('../../src/models/Book.js'),
        Proceed = require('../../src/views/Proceed.js'),
        proceed,
        Cart = require('../../src/models/Cart.js'),
        cart,
        Offers = require('../../src/models/Offers.js'),
        offers

    Proceed.prototype.loadTemplates = function () {
        this.loaderTemplate = fs.readFileSync('./src/templates/loader.html', 'utf8')
        this.offerTemplate = fs.readFileSync('./src/templates/offer.html', 'utf8')
        this.proceedTemplate = fs.readFileSync('./src/templates/Proceed.html', 'utf8')
        this.offerNotFoundTemplate = fs.readFileSync('./src/templates/offerNotFound.html', 'utf8')
    }

    describe('Proceed view', function () {

        describe('when calling offer calculation methods', function () {
            beforeEach(function () {
                cart = new Cart()

                offers = new Offers(cart.toString())

                Proceed.prototype.initOffers = function () {
                    return null // no server call
                }

                proceed = new Proceed(cart, offers)
            })
            describe('when calling getPercentageOffer', function () {

                it('should return value', function () {
                    expect(proceed.getPercentageOffer(100, 5)).toEqual(95)
                })
            })

            describe('when calling getMinusOffer', function () {

                it('should return value', function () {
                    expect(proceed.getMinusOffer(50, 5)).toEqual(45)
                })
            })

            describe('when calling getSliceOffer', function () {

                it('should return value', function () {
                    expect(proceed.getSliceOffer(100, 100, 5)).toEqual(95)
                    expect(proceed.getSliceOffer(200, 150, 5)).toEqual(195)
                    expect(proceed.getSliceOffer(300, 150, 5)).toEqual(290)
                    expect(proceed.getSliceOffer(90, 100, 30)).toEqual(90)
                    expect(proceed.getSliceOffer(290, 100, 12)).toEqual(266)
                    expect(proceed.getSliceOffer(290, 200, 12)).toEqual(278)
                })
            })

        })

        describe('when calling getLowestOffer', function () {

            beforeEach(function () {
                cart = new Cart()
            })

            describe('when calling getLowestOffer and the lowest price provided by slice', function () {
                it('should return value', function () {
                    var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 10 })
                    cart.addBookToCart(book1)
                    var book2 = new Book({ isbn: 'a460afed-e5e7-4e39-a39d-c885c05db861', price: 60 })
                    cart.addBookToCart(book2)
                    var book3 = new Book({ isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc', price: 1000 })
                    cart.addBookToCart(book3)

                    offers = new Offers(cart.toString())

                    Proceed.prototype.initOffers = function () {
                        this.offers.set({
                            offers: [
                                {
                                    'type': 'percentage',
                                    'value': 4 // price after offer = 1027.2
                                },
                                {
                                    'type': 'minus',
                                    'value': 15 // price after offer = 1055
                                },
                                {
                                    'type': 'slice',
                                    'sliceValue': 100,
                                    'value': 12 // price after offer = 950 => expected
                                }
                            ]
                        })

                        this.lowestOffer = this.getLowestOffer()
                        this.offerFound = true
                        this.render()
                    }

                    proceed = new Proceed(cart, offers)
                    expect(proceed.getLowestOffer().priceAfterOffer).toEqual(950)
                })
            })

            describe('when calling getLowestOffer and the lowest price provided by both percentage and slice', function () {
                it('should return value', function () {
                    var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 5 })
                    cart.addBookToCart(book1)
                    var book2 = new Book({ isbn: 'a460afed-e5e7-4e39-a39d-c885c05db861', price: 2 })
                    cart.addBookToCart(book2)
                    var book3 = new Book({ isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc', price: 3 })
                    cart.addBookToCart(book3)

                    offers = new Offers(cart.toString())

                    Proceed.prototype.initOffers = function () {
                        this.offers.set({
                            offers: [
                                {
                                    'type': 'percentage',
                                    'value': 5
                                },
                                {
                                    'type': 'minus',
                                    'value': 5
                                },
                                {
                                    'type': 'slice',
                                    'sliceValue': 10,
                                    'value': 5
                                }
                            ]
                        })

                        this.lowestOffer = this.getLowestOffer()
                        this.offerFound = true
                        this.render()
                    }

                    proceed = new Proceed(cart, offers)
                    expect(proceed.getLowestOffer().priceAfterOffer).toEqual(5)
                })
            })
            
            describe('when calling getLowestOffer and the lowest price provided minus', function () {
                it('should return value', function () {
                    var book1 = new Book({ isbn: 'c8fabf68-8374-48fe-a7ea-a00ccd07afff', price: 10 })
                    cart.addBookToCart(book1)
                    var book2 = new Book({ isbn: 'a460afed-e5e7-4e39-a39d-c885c05db861', price: 30 })
                    cart.addBookToCart(book2)
                    var book3 = new Book({ isbn: 'fcd1e6fa-a63f-4f75-9da4-b560020b6acc', price: 60 })
                    cart.addBookToCart(book3)

                    offers = new Offers(cart.toString())

                    Proceed.prototype.initOffers = function () {
                        this.offers.set({
                            offers: [
                                {
                                    'type': 'percentage',
                                    'value': 20
                                },
                                {
                                    'type': 'minus',
                                    'value': 50
                                },
                                {
                                    'type': 'slice',
                                    'sliceValue': 100,
                                    'value': 40
                                }
                            ]
                        })

                        this.lowestOffer = this.getLowestOffer()
                        this.offerFound = true
                        this.render()
                    }

                    proceed = new Proceed(cart, offers)
                    expect(proceed.getLowestOffer().priceAfterOffer).toEqual(50)
                })
            })
        })
    })
})