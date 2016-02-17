var AppRouter = Backbone.Router.extend({
    routes : {
        'proceed' : 'proceed',
        '': 'pickBooks'
    }
})
 
module.exports = AppRouter