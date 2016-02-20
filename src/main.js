require('./styles/style.css')

var AppRouter = Backbone.Router.extend({
    routes: {
        'proceed': 'proceed',
        '*path': 'pickBooks'
    }
}),
    Cart = require('./models/Cart'),
    appRouter = new AppRouter(),
    cart = new Cart()

appRouter.on('route:proceed', function () {
    var Proceed = require('./views/Proceed'),
        Offers = require('./models/Offers')
    new Proceed(cart, new Offers())
})

appRouter.on('route:pickBooks', function () {
    var PickBooks = require('./views/PickBooks')

    new PickBooks(cart)
})

Backbone.history.start()