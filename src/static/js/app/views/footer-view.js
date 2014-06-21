define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/footer-view');
var keys = require('app/enums/keys').keys;

var FooterView = Backbone.Marionette.Layout.extend({
    template: template,
    ui: {

    },

    events: {
        'click #clear-completed': 'onClearCompleted'
    },

    initialize: function(options) {
        this.collection = options.collection;
    },

    onRender: function() {
        // TODO
    },

    onClearCompleted: function() {
        function destroy(task) {
            task.destroy();
        }
        this.collection.completedTasks().forEach(function(model) {
            model.destroy();
        });
    }
});

exports.FooterView = FooterView;

});
