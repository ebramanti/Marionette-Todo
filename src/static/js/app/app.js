// Leave this alone as much as possible. Regions are fair game.
define(function(require, exports, module) {
    var marionette = require('marionette');
    var app = new marionette.Application();

    app.addRegions({
        initialTask: '#task-creation-view',
        taskListView: '#task-list-view',
        taskItemView: '#task-item-view',
        taskManipulatorView: '#task-manipulator-view'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: false
        });
    });


    return app;
});
