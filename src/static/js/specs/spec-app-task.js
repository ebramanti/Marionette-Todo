define(function(require, exports, module) {

var marionette = require('marionette');
var Task = require('app/models/task').Task;
var SpecHelpers = require('spec-helpers');
var eventHelpers = SpecHelpers.Events;
var KeyCodes = SpecHelpers.KeyCodes;

describe('my task', function() {

    it('initializes', function() {
        var task = new Task({
            title: 'Test model.',
            isActive: false
        });
        expect(task.attributes.title).toEqual('Test model.');
        expect(task.attributes.isActive).toBe(false);
        expect(task.attributes.date).toBeDefined();
    });

    it('toggles isActive', function() {
        var task = new Task({
            title: 'Test model.',
            isActive: false,
            localStorage: false
        });
        task.toggleIsActive();
        expect(task.attributes.isActive).toBe(true);
    });

});

});
