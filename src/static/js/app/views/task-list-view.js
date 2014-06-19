define(function (require, exports, module) {

var marionette = require('marionette');
var TaskItemView = require('app/views/task-item-view').TaskItemView;
var template = require('hbs!../templates/task-list-view');

var TaskListView =  marionette.CollectionView.extend({
    template: template,
    itemView : TaskItemView,
    itemViewContainer : '#task-list',
    initialize : function(){

    },
    ui : {

    },
    events : {

    }
});

exports.TaskListView = TaskListView;

});
