define(function(require, exports, module) {

var marionette = require('marionette');
var Tasks = require('app/collections/tasks').Tasks;
var SpecHelpers = require('spec-helpers');
var eventHelpers = SpecHelpers.Events;
var KeyCodes = SpecHelpers.KeyCodes;

describe('my tasks', function() {

    it('initializes', function() {
        var tasks = new Tasks({
            ignoreLocalStorage: false
        });
        expect(tasks).toBeDefined();
    });

    it('gets active tasks', function() {
        var tasks = new Tasks([
            {title: '1'},
            {title: '2'},
            {title: '3', isActive: false}
        ],
        {
            ignoreLocalStorage: false
        });

        var active = tasks.activeTasks();
        expect(active).toEqual(tasks.where({isActive: true}));

        var numActive = tasks.numOfActiveTasks();
        expect(numActive).toEqual(2);
    });

    it('gets completed tasks', function() {
        var tasks = new Tasks([
            {title: '1'},
            {title: '2', isActive: false},
            {title: '3', isActive: false}
        ],
        {
            ignoreLocalStorage: false
        });

        var completed = tasks.completedTasks();
        expect(completed).toEqual(tasks.where({isActive: false}));

        var numCompleted = tasks.numOfCompletedTasks();
        expect(numCompleted).toEqual(2);
    });

});

});
