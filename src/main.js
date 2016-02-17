var AppRouter = Backbone.Router.extend({
    routes: {
        'proceed': 'proceed',
        '*path': 'pickBooks'
    }
})

var appRouter = new AppRouter()

appRouter.on('route:proceed', function () {
    $('#content').text('Home Screen')
})

appRouter.on('route:pickBooks', function () {
    var PickBooks = require('./views/PickBooks')

    new PickBooks()
})

Backbone.history.start()