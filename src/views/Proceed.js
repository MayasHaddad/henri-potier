var Proceed = Backbone.View.extend({

    el: $('#content'),

    initialize: function (cart, offers) {
        _.bindAll(this, 'render', 'loadTemplates', 'getLowestOffer', 'initOffers')

        this.loadTemplates()
        this.offers = offers
        this.cart = cart

        this.initOffers()

        this.render()
    },

    initOffers: function () {
        this.offers.getOffers(this.cart.toString())
        var self = this
        this.offers.deferred.done(function (result, response) {
            self.lowestOffer = self.getLowestOffer()
            self.offerFound = true
            self.render()
        })

        this.offers.deferred.fail(function () {
            self.offerFound = false
            self.render()
        })
    },

    loadTemplates: function () {
        this.loaderTemplate = require('../templates/loader.html')
        this.breadcrumbTemplate = require('../templates/breadcrumb.html')
        this.offerTemplate = require('../templates/offer.html')
        this.proceedTemplate = require('../templates/Proceed.html')
        this.offerNotFoundTemplate = require('../templates/offerNotFound.html')
    },

    getPercentageOffer: function (initialPrice, percentageValue) {
        return initialPrice * (1 - percentageValue / 100)
    },

    getMinusOffer: function (initialPrice, minusValue) {
        return initialPrice - minusValue
    },

    getSliceOffer: function (initialPrice, sliceValue, value) {
        return initialPrice - Math.floor(initialPrice / sliceValue) * value
    },

    getLowestOffer: function () {
        var self = this
        var pricesAfterOffers = _.map(this.offers.get('offers'), function (offer) {
            switch (offer.type) {
                case 'percentage':
                    return {
                        priceAfterOffer: Math.round(self.getPercentageOffer(self.cart.get('totalPrice'), offer.value) * 100) / 100,
                        offerValue: offer.value,
                        offerUnit: ' %'
                    }
                    break
                case 'minus':
                    return {
                        priceAfterOffer: Math.round(self.getMinusOffer(self.cart.get('totalPrice'), offer.value) * 100) / 100,
                        offerValue: offer.value,
                        offerUnit: ' €'
                    }
                    break
                case 'slice':
                    return {
                        priceAfterOffer: Math.round(self.getSliceOffer(self.cart.get('totalPrice'), offer.sliceValue, offer.value) * 100) / 100,
                        offerValue: offer.value,
                        offerUnit: ' €'
                    }
                    break
            }
        })

        return _.min(pricesAfterOffers, function (offer) { return offer.priceAfterOffer })
    },

    render: function () {
        var template = this.loaderTemplate,
            templateVariables = {}

        if (this.offerFound === true) {
            var offerTemplate = _.template(this.offerTemplate)({ cart: this.cart, lowestOffer: this.lowestOffer }),
                breadcrumbTemplate = _.template(this.breadcrumbTemplate)({ breadcrumbElements: ['Je choisis mes livres', 'Je confirme mon achat'] })
            template = this.proceedTemplate
            templateVariables = { offerTemplate: offerTemplate, breadcrumbTemplate: breadcrumbTemplate }
        }

        if (this.offerFound === false) {
            template = this.offerNotFoundTemplate
        }

        this.$el.html(_.template(template)(templateVariables))
    }
})

module.exports = Proceed