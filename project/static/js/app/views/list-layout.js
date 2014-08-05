define(function (require, exports, module) {

var marionette = require('marionette');
var template = require('hbs!../templates/list-layout');
var keys = require('app/enums/keys').keys;

var Tasks = require('app/collections/tasks').Tasks;
var ListView = require('app/views/list-view').ListView;

var Status = require('app/models/task').Status;

var ListLayout = Backbone.Marionette.Layout.extend({
    template: template,
    tagName: 'ul',
    ui: {
        numberActive: '#active-count strong',
        toggleAll: '#toggle-all',
        checkDone: '#check-done',
        clearCompleted: '#clear-completed'
    },

    events: {
        'click #clear-completed': 'wantsClearCompleted',
        'click .filter': 'wantsChangeFilter',
        'click #toggle-all': 'wantsToggleAll'
    },

    regions: {
        filtered: '#task-list'
    },

    initialize: function(options) {
        this.masterCollection = options.collection;
        this.partitions = this.createTaskPartitions(this.masterCollection);
        this.currentCollectionView = null;

        // Listener designed to keep track of number of active/completed tasks of master collection.
        this.listenTo(this.masterCollection, 'all', function() {
            this.numActive = this.masterCollection.numOfActiveTasks();
            this.numCompleted = this.masterCollection.numOfCompletedTasks();

            // Check if all tasks are completed, and check complete-all if so.
            if (this.numActive < 1) {
                this.ui.checkDone.addClass('done');
            } else {
                this.ui.checkDone.removeClass('done');
            }

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
            collection: new Tasks(tasks.where({isActive: true}))
        });

        var completed = new ListView({
            masterCollection: tasks,
            filterBy: Status.Completed,
            collection: new Tasks(tasks.where({isActive: false}))
        });

        partitions['*'] = all;
        partitions[Status.Active] = active;
        partitions[Status.Completed] = completed;

        return partitions;
    },

    onShow: function() {
        this.showCollection(this.partitions['*']);
        this.numActive = this.masterCollection.numOfActiveTasks();
        this.ui.numberActive.text(this.numActive);
        if (this.numActive < 1) {
            this.ui.checkDone.addClass('done');
        }
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
        this.ui.checkDone.removeClass('done');
    },

    wantsChangeFilter: function(event) {
        this.onChangeFilter(event);
    },

    onChangeFilter: function(event) {
        var $target = $(event.currentTarget);
        var status = $target.data('status');
        var view = this.partitions[status] || null;

        if (view) this.showCollection(view);
    },

    wantsToggleAll: function(event) {
        this.onToggleAll(event);
    },

    onToggleAll: function(event) {
        var toggled = this.ui.checkDone.hasClass('done');
        this.masterCollection.forEach(function(model) {
            model.set('isActive', toggled);
        });
        if (toggled) {
            this.ui.checkDone.removeClass('done');
        } else {
            this.ui.checkDone.addClass('done');
        }
        // Updates the current collection view.
        this.currentCollectionView.render();
    },

    serializeData: function() {
        return {Status: Status}
    }
});

exports.ListLayout = ListLayout;

});
