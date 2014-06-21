define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/footer-view');
var keys = require('app/enums/keys').keys;

var FooterView = Backbone.Marionette.Layout.extend({
    template: template,
    ui: {
        numberActive: '#tasklist strong'
    },

    events: {
        'click #clear-completed': 'onClearCompleted'
    },

    initialize: function(options) {
        this.collection = options.collection;
        //this.collection.on('change:isActive', this.updateActive());
    },

    onRender: function() {
        //this.updateActive();
    },

    onClearCompleted: function() {
        this.collection.completedTasks().forEach(function(model) {
            model.destroy();
        });
    },

    updateActive: function() {
        // TODO
        console.log(this.collection.activeTasks().length);
        //this.ui.numberActive.html(this.collection.activeTasks().length);
    }
});

exports.FooterView = FooterView;

});
