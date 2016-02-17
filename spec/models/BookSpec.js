describe('Book', function () {
    var Book = require('../../src/models/Book.js'),
        book

    beforeEach(function () {
        book = new Book()
    })

    describe('Book model', function () {

        describe('when instantiated', function () {

            it('should exhibit attributes', function () {
                expect(book.get('isbn')).toEqual('')
                expect(book.get('title')).toEqual('')
                expect(book.get('price')).toEqual(0)
                expect(book.get('cover')).toEqual('')
            })
        })
    })
})