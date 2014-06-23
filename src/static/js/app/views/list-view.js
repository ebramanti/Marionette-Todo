define(function (require, exports, module) {

var marionette = require('marionette');
var TaskView = require('app/views/task-view').TaskView;
var template = require('hbs!../templates/list-view');
var Status = require('app/models/task').Status;

var ListView =  marionette.CollectionView.extend({
    itemView : TaskView,

    initialize : function(options) {
        this.masterCollection = options.masterCollection;
        this.filterBy = options.filterBy || null;

        // Check for a collection, this is required in a view of a task list.
        if (!this.masterCollection) {
            throw new Error('No collection passed to Task List view.');
        }

        if (this.filterBy) {
            this.listenTo(this.masterCollection, 'add', this.onTaskAdd);
        }

        this.listenTo(this.masterCollection, 'change: isActive', this.onActiveChange);
    },

    onTaskAdd: function(model) {
        var activeFilter = (this.filterBy === Status.Active && model.get('isActive'));
        var completedFilter = (this.filterBy === Status.Completed && !model.get('isActive'));
        console.log(completedFilter);
        if(activeFilter || completedFilter) {
            // This will initialize a collection attribute
            this.collection.add(model);
        }
    },

    onActiveChange: function(model) {

        //var changingTask = this.collection.find(model.name);
        //var switched = !changingTask.get('isActive');
    }

});

exports.ListView = ListView;

});
