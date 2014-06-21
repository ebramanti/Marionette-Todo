define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/item-view');
var keys = require('app/enums/keys').keys;

var ItemView = marionette.ItemView.extend({
    tagName: 'li',
    template : template,
    ui: {
        edit: '.edit',
        remove: '.remove',
        title: '.title'
    },
    // Four possible events: remove, edit, accept edit,
    // & active/completed state switching.
    events: {
        'click .destroy': 'wantsRemove',
        'click .edit': 'editClick',
        'keypress .editor': 'editAccept',
        'click .changeStatus': 'switchState'
    },
    initialize: function(options) {
        this.collection = options.collection;
        this.model = options.model;
        console.log(this.model);
    },

    // On show, set all of the different completed or active states.
    onShow: function() {
        this.$el.removeClass('active completed')
        var isActive = this.model.get('isActive');
        if (isActive) {
            this.$el.addClass('active');
        } else {
            this.$el.addClass('completed');
        }
    },

    editClick: function() {
        console.log("I'm here.");
        this.$el.addClass('editor');
        //this.ui.editor.focus(); // focus in JQuery snaps it to that element
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
        // TODO switch div class like 'onRender' function
        // whenever this is called.
    },

    wantsRemove: function() {
        this.destroyModel();
    },

    destroyModel: function() {
        this.model.destroy();
    }
});

exports.ItemView = ItemView;

});
