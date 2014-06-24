define(function (require, exports, module) {

var marionette = require('marionette');
var TaskView = require('app/views/task-view').TaskView;
var template = require('hbs!../templates/list-view');
var Status = require('app/models/task').Status;

var ListView =  marionette.CollectionView.extend({
    itemView : TaskView,

    initialize : function(options) {
        this.masterCollection = options.masterCollection;
        this.collection = options.collection;
        this.filterBy = options.filterBy || null;
        this.filterNumber = options.filterNumber;

        // Check for a collection, this is required in a view of a task list.
        if (!this.masterCollection) {
            throw new Error('No collection passed to Task List view.');
        }

        if (this.filterBy) {
            this.listenTo(this.masterCollection, 'add', this.onTaskAdd);
        }

        this.listenTo(this.masterCollection, 'change:isActive', this.onActiveChange);
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
        console.log(this.masterCollection === this.collection)
        var localCollectionModel = this.collection.get(model.cid);
        console.log(localCollectionModel);
        if (this.collection.get(localCollectionModel)) {
            this.collection.remove(localCollectionModel);
        } else {
            this.collection.add(localCollectionModel);
        }
        console.log("Master Collection " + this.filterNumber);
        console.log(this.masterCollection);
        console.log("Local Collection " + this.filterNumber);
        console.log(this.collection);
    }

});

exports.ListView = ListView;

});
