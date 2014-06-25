define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/header-view');
var keys = require('app/enums/keys').keys;

var HeaderView = marionette.ItemView.extend({
    template : template,
    tagName: 'ul',
    ui: {
        input: '#new-task'
    },
    events: {
        'keypress #new-task': 'onInputConfirm'
    },
    initialize : function(options){
        this.masterCollection = options.collection
    },
    onInputConfirm: function(event) {
        // trim() trims whitespace (if any) in val()
        var taskString = this.ui.input.val().trim();

        // Check for enter key press & if string is defined.
        if (event.which === keys.ENTER_KEY && taskString) {
            event.preventDefault();
            this.createTask(taskString);
            this.ui.input.val('');
        }
    },
    createTask: function(name) {
        this.masterCollection.add({
            title: name
        })
    }
});

exports.HeaderView = HeaderView;

});
