// Leave this alone as much as possible. Regions are fair game.
define(function(require, exports, module) {
    var marionette = require('marionette');
    var app = new marionette.Application();

    app.addRegions({
        headerRegion: '#header-view',
        listRegion: '#list-view',
        footerRegion: '#footer-view'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: false
        });
    });


    return app;
});
