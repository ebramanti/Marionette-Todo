define(function (require, exports, module) {

var marionette = require('marionette');
var AppController = require('app/app-controller').AppController;

var AppRouter  =  marionette.AppRouter.extend({
    controller: new AppController(),
    appRoutes:{
        '*index':'index',
        // Filters tasks by active/completed.
        '*filter': 'taskListFilter'
    }
});

exports.AppRouter = AppRouter;

});
