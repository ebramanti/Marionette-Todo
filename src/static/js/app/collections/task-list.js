var TaskList = Backbone.Collection.extend({
    model: Task,
    completedTasks: function() {
        return this.filter(function() {
            return task.get('status', 'completed')
        });
    },
    activeTasks: function() {
        return this.filter(function() {
            return task.get('status', 'active')
        })
    },
});
