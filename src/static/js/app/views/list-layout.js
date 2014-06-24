define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/list-layout');
var keys = require('app/enums/keys').keys;

var Task = require('app/models/task').Task;
var Tasks = require('app/collections/tasks').Tasks;

var ListView = require('app/views/list-view').ListView;

var Status = require('app/models/task').Status;

var ListLayout = Backbone.Marionette.Layout.extend({
    template: template,
    ui: {
        numberActive: '#tasklist strong'
    },

    events: {
        'click #clear-completed': 'wantsClearCompleted',
        'click .filter': 'wantsChangeFilter'
    },

    regions: {
        filtered: '#task-list'
    },

    initialize: function(options) {
        this.masterCollection = options.collection;
        this.partitions = this.createTaskPartitions(this.masterCollection);
        this.currentCollectionView = null;
    },

    createTaskPartitions: function(tasks) {
        var partitions = {};

        var all = new ListView({
            masterCollection: tasks,
            collection: tasks,
            filterNumber: 1
        });

        var active = new ListView({
            masterCollection: tasks,
            filterBy: Status.Active,
            collection: new Tasks(tasks.where({status: Status.Active})),
            filterNumber: 2
        });

        var completed = new ListView({
            masterCollection: tasks,
            filterBy: Status.completed,
            collection: new Tasks(tasks.where({status: Status.Completed})),
            filterNumber: 3
        });

        partitions['*'] = all;
        partitions[Status.Active] = active;
        partitions[Status.Completed] = completed;

        return partitions;
    },

    onShow: function() {
        this.showCollection(this.partitions['*']);
    },

    showCollection: function(view) {
        if (view !== this.currentCollectionView) {
            this.filtered.show(view, {preventClose: true});
            this.currentCollectionView = view;
            this.updateChecked(view);
        }
    },

    updateChecked: function(view) {

    },

    wantsClearCompleted: function() {
        this.onClearCompleted();
    },

    onClearCompleted: function() {
        this.collection.completedTasks().forEach(function(model) {
            model.destroy();
        });
    },

    serializeData: function() {
        return {Status: Status}
    },

    updateActive: function() {
        // TODO
        console.log(this.collection.activeTasks().length);
    },

    wantsChangeFilter: function(event) {
        var $target = $(event.currentTarget);
        var status = $target.data('status');
        console.log(status);
        var view = this.partitions[status] || null;

        if (view) this.showCollection(view);
    }
});

exports.ListLayout = ListLayout;

});
