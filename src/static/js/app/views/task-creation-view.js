var TaskCreationView = Marionette.ItemView.extend({
    template: '',
    ui: {
        input: '#new-task'
    },
    events: {
        'keypress #new-task': 'onInputConfirm'
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
