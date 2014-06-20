define(function( require, exports, module ){

var backbone = require('backbone');
var Task = require('app/models/task').Task;

var Tasks =  backbone.Collection.extend({
    //urlRoot: '/api/v1/auction_item/',
    model: Task,
    completedTasks: function() {
        return this.filter(function(task) {
            return !task.get('isActive')
        });
    },
    activeTasks: function() {
        return this.filter(function(task) {
            return task.get('isActive')
        })
    }
});

exports.Tasks = Tasks;

});
