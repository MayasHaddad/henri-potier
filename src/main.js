require('./styles/style.css')
require('./styles/style-mobile.css')
require('materialize-css/dist/css/materialize.min.css')
require('materialize-css/dist/js/materialize.js')

var AppRouter = Backbone.Router.extend({
    routes: {
        'proceed': 'proceed',
        '*path': 'pickBooks'
    }
}),
    Cart = require('./models/Cart'),
    appRouter = new AppRouter(),
    cart = new Cart(),
    PickBooks = require('./views/PickBooks'),
    pickBooks = new PickBooks(),
    Proceed = require('./views/Proceed'),
    Offers = require('./models/Offers'),
    proceed = new Proceed()

appRouter.on('route:proceed', function () {
    proceed.load(cart, new Offers())
})

appRouter.on('route:pickBooks', function () {
    pickBooks.load(cart)
})

Backbone.history.start()