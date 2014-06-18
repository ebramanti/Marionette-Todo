var TaskItemView = Backbone.Marionette.CollectionView.extend({
    tagName: '',
    template: '', //TODO fill this in when ready

    ui: {
        edit: '.edit'
    }

    // Four possible events: remove, edit, accept edit,
    // & active/completed state switching.
    events: {
        'click .remove': 'remove',
        'click .edit': 'editClick',
        'keypress .edit': 'editAccept',
        'click .changeStatus': 'switchState'
    },

    initialize: function() {
        // TODO figure this out (think I use listenTo() here.)
        //this.bindTo();
    },

    // On render, set all of the different completed or active states.
    onRender: function() {
        this.$el.removeClass('active completed')
        if (this.model.get('status') === 'completed') {
            this.$el.addClass('completed');
        } else if (this.model.get('status') === 'active') {
            this.$el.addClass('active');
        }
    },

    editClick: function() {
        this.$el.addClass('editor');
        this.ui.edit.focus(); // focus in JQuery snaps it to that element
    },

    // Almost exact same logic as TaskCreation's 'onInputConfirm'.
    editAccept: function() {
        var ENTER_KEY = 13;
        var taskString = this.ui.input.val().trim();
        if (event.which === ENTER_KEY && taskString) {
            this.model.set('title', taskString).save();
            this.$el.removeClass('editor')
        }
    }

    switchState: function() {
        this.model.changeStatus().save();
    },

    remove: function() {
        this.model.destroy();
    }

});
