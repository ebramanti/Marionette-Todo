// Leave this alone as much as possible. Regions are fair game.
define(function(require, exports, module) {
    var marionette = require('marionette');
    var app = new marionette.Application();

    app.addRegions({
        /*window: '#window',
        modal: '#modal',
        activity: '#activity'*/
        InitialTask: '#task-creation-view',
        TaskListView: '#task-list-view',
        TaskItemView: '#task-item-view',
        TaskManipulatorView: '#task-manipulator-view'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: false
        });
    });


    return app;
});
