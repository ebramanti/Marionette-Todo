define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/task-view');
var keys = require('app/enums/keys').keys;

var TaskView = marionette.ItemView.extend({
    tagName: 'li',
    template : template,
    ui: {
        edit: '.edit',
        input: '.editor',
        remove: '.remove',
        title: '.title',
        checkbox: '.changeStatus'
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
        this.masterCollection = options.masterCollection;
        this.model = options.model;
    },

    // On show, set all of the different completed or active states.
    onShow: function() {
        this.toggleClass();
    },

    editClick: function() {
        var editBoxHidden = this.ui.input.css('display') === 'none';
        if (editBoxHidden) {
            this.ui.input.show().focus();
        } else {
            this.ui.input.hide();
        }
    },

    // Almost exact same logic as TaskCreation's 'onInputConfirm'.
    editAccept: function(event) {
        var taskString = this.ui.input.val().trim();
        if (event.which === keys.ENTER_KEY && taskString) {
            this.model.set('title', taskString).save();
            console.log(this.model.get('title'));
            this.ui.title.html(taskString);
            this.ui.input.val('');
            this.ui.input.hide();
        }
    },

    switchState: function() {
        this.model.toggleIsActive();
        this.toggleClass();
    },

    toggleClass: function() {
        this.$el.removeClass('active completed done')
        var isActive = this.model.get('isActive');
        if (isActive) {
            this.$el.addClass('active');
        } else {
            this.$el.addClass('completed done');
        }
    },

    wantsRemove: function() {
        this.destroyModel();
    },

    destroyModel: function() {
        this.model.destroy();
    }
});

exports.TaskView = TaskView;

});
