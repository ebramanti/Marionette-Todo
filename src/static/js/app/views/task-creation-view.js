define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/task-creation-view');

var TaskCreationView = marionette.ItemView.extend({
    template : template,
    ui: {
        input: '#new-task'
    },
    events: {
        'keypress #new-task': 'onInputConfirm'
    },
    initialize : function(){
        // TODO
    },
    onInputConfirm: function(event) {
        //http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
        var ENTER_KEY = 13;

        // trim() trims whitespace (if any) in val()
        var taskString = this.ui.input.val().trim();

        // Check for enter key press & if string is defined.
        if (event.which === ENTER_KEY && taskString) {
            TaskList.create({
                title: taskString
            })
        }
    }
});

exports.TaskCreationView = TaskCreationView;

});
