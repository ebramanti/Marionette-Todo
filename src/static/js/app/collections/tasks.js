define(function( require, exports, module ){

var backbone = require('backbone');
var LocalStorage = require('backbone/localstorage');
var Task = require('app/models/task').Task;

var Tasks = backbone.Collection.extend({
    model: Task,

    initialize: function(options) {
        // Check if there are any options passed,
        // or if the ignore was passed.
        if(!options || !options.ignoreLocalStorage){
            this.localStorage = new LocalStorage('task-list');
        }
    },
    activeTasks: function() {
        return this.filter(function(task) {
            return task.get('isActive')
        })
    },
    completedTasks: function() {
        return this.filter(function(task) {
            return !task.get('isActive')
        });
    },
    numOfActiveTasks: function() {
        return this.activeTasks().length;
    },
    numOfCompletedTasks: function() {
        return this.completedTasks().length;
    }
});

exports.Tasks = Tasks;

});
