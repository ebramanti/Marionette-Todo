define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/list-layout');
var keys = require('app/enums/keys').keys;
var Handlebars = require('handlebars')

var Task = require('app/models/task').Task;
var Tasks = require('app/collections/tasks').Tasks;

var ListView = require('app/views/list-view').ListView;

var Status = require('app/models/task').Status;

var ListLayout = Backbone.Marionette.Layout.extend({
    template: template,
    ui: {
        numberActive: '#active-count strong',
        toggleAll: '#toggle-all'
    },

    events: {
        'click #clear-completed': 'wantsClearCompleted',
        'click .filter': 'wantsChangeFilter',
        'click #toggle-all': 'onToggleAll'
    },

    regions: {
        filtered: '#task-list'
    },

    initialize: function(options) {
        this.masterCollection = options.collection;
        this.partitions = this.createTaskPartitions(this.masterCollection);
        this.currentCollectionView = null;
        this.numActive = 0;

        // Listener designed to keep track of number of active/completed tasks of master collection.
        this.listenTo(this.masterCollection, 'all', function() {
            this.numActive = this.masterCollection.numOfActiveTasks();
            this.numCompleted = this.masterCollection.numOfCompletedTasks();
            console.log('Active: ' + this.numActive + ' --- Completed: ' + this.numCompleted);
            this.ui.numberActive.text(this.numActive);
        });
    },

    createTaskPartitions: function(tasks) {
        var partitions = {};

        var all = new ListView({
            masterCollection: tasks,
            collection: tasks
        });

        var active = new ListView({
            masterCollection: tasks,
            filterBy: Status.Active,
            collection: new Tasks(tasks.where({status: Status.Active}))
        });

        var completed = new ListView({
            masterCollection: tasks,
            filterBy: Status.completed,
            collection: new Tasks(tasks.where({status: Status.Completed}))
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
        }
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

    wantsChangeFilter: function(event) {
        var $target = $(event.currentTarget);
        var status = $target.data('status');
        console.log(status);
        var view = this.partitions[status] || null;

        if (view) this.showCollection(view);
    },

    onToggleAll: function(event) {
        this.masterCollection.forEach(function(model) {
            var toggle = !event.currentTarget.checked
            model.set('isActive', toggle);
        })
        // Updates the current collection view.
        this.currentCollectionView.render();
    }
});

exports.ListLayout = ListLayout;

});
