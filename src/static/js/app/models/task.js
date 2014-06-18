// Model for tasks in Todo app
var Task = Backbone.model.extend({
    defaults: {
        title: '', //empty when user creates a task
        status: 'active',
        date: undefined
    },
    initialize: function() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
        this.set('date', Date.now());
    },
    changeStatus: function() {
        return this.get('status') === 'active' ? this.set('status', 'completed') : this.set('status', 'active')
    }
});
