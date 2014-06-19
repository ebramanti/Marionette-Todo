define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/task-manipulator-view');
var keys = require('app/enums/keys').keys;

var TaskManipulatorView = Backbone.Marionette.Layout.extend({
    template: template,
    ui: {
        filters: ''
    },

    events: {

    },

    initialize: function() {
        // TODO need a way to listen to the collection
    },

    onRender: function() {
        // TODO
    }
});

exports.TaskManipulatorView = TaskManipulatorView;

});
