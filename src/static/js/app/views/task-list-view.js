var TaskListView = Backbone.Marionette.CollectionView.extend({
    template: '',
    itemView: TaskList,
    //itemViewController: '',

    initialize: function() {
        this.listenTo(this.collection, 'add', this.updateStatus);
    },

    onRender: function() {
        // Update statuses after DOM is loaded.
        this.updateStatus();
    },

    // Updates status of checkboxes when called.
    updateStatus: function() {
        // TODO
    }
})
