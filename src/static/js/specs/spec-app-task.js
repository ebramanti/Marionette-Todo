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
        /*var region;
        beforeEach(function() {
            var store = {};
            spyOn(localStorage, 'getItem').and.callFake(function (key) {
                return store[key];
            });
            spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
                return store[key] = value + '';
            });
            spyOn(localStorage, 'clear').and.callFake(function () {
              store = {};
            });

            loadFixtures('template.html');
            region = new marionette.Region({el: '.container'});
        });

        it('initializes', function() {
            //var taskView = new TaskView({
            //    masterCollection: new Tasks(),
            //    model: new Task()
            //})
            var foo = new Task();
            // expect(taskView).toBeDefined();
            // region.show(taskView);
        }); */
    })
})
