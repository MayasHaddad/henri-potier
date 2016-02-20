var Offers = Backbone.Model.extend({

    defaults: {
        offers: []
    },

    initialize: function () {
        _.bindAll(this, 'getOffers')
    },
    
    getOffers: function (isbnList) {
        this.url = 'http://henri-potier.xebia.fr/books/' + isbnList + '/commercialOffers'
        this.deferred = this.fetch()
    }
})

module.exports = Offers