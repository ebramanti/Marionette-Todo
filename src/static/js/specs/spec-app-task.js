define(function(require, exports, module) {

var Backbone = require('backbone');
var marionette = require('marionette');
var Task = require('app/models/task').Task;
var Tasks = require('app/collections/tasks').Tasks;
var localStorage = require('backbone/localstorage');
var TaskView = require('app/views/task-view').TaskView;

var SpecHelpers = require('spec-helpers');
var eventHelpers = SpecHelpers.Events;
var KeyCodes = SpecHelpers.KeyCodes;

describe('my task view', function() {
    var region;
    beforeEach(function() {
        loadFixtures('template.html');
        region = new marionette.Region({el: '.container'});
    });

    it('initializes', function() {
        var taskView = new TaskView({
            masterCollection: new Tasks({
                ignoreLocalStorage: true
            }),
            model: new Task()
        });
        expect(taskView).toBeDefined();
        region.show(taskView);
    });

    it('should allow editing of the task title', function() {
        var taskView = new TaskView({
            masterCollection: new Tasks({
                ignoreLocalStorage: true
            }),
            model: new Task({
                title: "A test of editing."
            })
        });
        region.show(taskView);

        //console.log(taskView.masterCollection.length);
        eventHelpers.simulateMouseDown(taskView.ui.edit);

        var changedTitle = "Changed it.";
        eventHelpers.insertChar(taskView.ui.input, changedTitle);
        console.log(taskView.ui.input)
        eventHelpers.simulateKeyPress(taskView.ui.edit, 13);
        //console.log(taskView.model)
        //expect(taskView.model.attributes.title).toEqual(changedTitle);

    });
});
});
