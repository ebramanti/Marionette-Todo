define(function(require, exports, module) {

var marionette = require('marionette');
var Tasks = require('app/collections/tasks').Tasks;
var ListView = require('app/views/list-view').ListView;
var SpecHelpers = require('spec-helpers');
var eventHelpers = SpecHelpers.Events;
var KeyCodes = SpecHelpers.KeyCodes;

describe('my list view', function() {
    var region;

    beforeEach(function() {
        loadFixtures('template.html');
        region = new marionette.Region({el: '.container'});
    });

    // Most of the testing for list-view requires
    // the list-layout, more tests seen in
    // spec-app-list-layout.js

    it('initializes', function() {
        var listView = new ListView({
            masterCollection: new Tasks({
                ignoreLocalStorage: true
            }),
            collection: new Tasks({
                ignoreLocalStorage: true
            })
        });
        expect(listView).toBeDefined();
        region.show(listView);
    });

});
});
