define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/item-view');
var keys = require('app/enums/keys').keys;

var ItemView = marionette.ItemView.extend({
    template : template,
    ui: {
        edit: '.edit'
    },
    // Four possible events: remove, edit, accept edit,
    // & active/completed state switching.
    events: {
        'click .remove': 'remove',
        'click .edit': 'editClick',
        'keypress .edit': 'editAccept',
        'click .changeStatus': 'switchState'
    },
    initialize: function(options) {
        this.collection = options.collection;
    },

    // On render, set all of the different completed or active states.
    onRender: function() {
        this.$el.removeClass('active completed')
        var isActive = this.model.get('isActive');
        if (isActive) {
            this.$el.addClass('active');
        } else {
            this.$el.addClass('completed');
        }
    },

    editClick: function() {
        this.$el.addClass('editor');
        this.ui.edit.focus(); // focus in JQuery snaps it to that element
    },

    // Almost exact same logic as TaskCreation's 'onInputConfirm'.
    editAccept: function() {
        var taskString = this.ui.input.val().trim();
        if (event.which === keys.ENTER_KEY && taskString) {
            this.model.set('title', taskString).save();
            this.$el.removeClass('editor')
        }
    },

    switchState: function() {
        this.model.toggleIsActive();
    },

    remove: function() {
        this.model.destroy();
    }
});

exports.ItemView = ItemView;

});
