define(function(require, exports, module) {

var marionette = require('marionette');
var Tasks = require('app/collections/tasks').Tasks;
var HeaderView = require('app/views/header-view').HeaderView;
var SpecHelpers = require('spec-helpers');
var eventHelpers = SpecHelpers.Events;
var KeyCodes = SpecHelpers.KeyCodes;

describe('my header view', function() {
    var region;

    function getSpyHeader(){
        var onInputConfirm = jasmine.createSpy('onInputConfirm');
        var SpyHeader = HeaderView.extend({
            onInputConfirm: onInputConfirm
        });
        return new SpyHeader({collection: new Tasks()});
    }

    beforeEach(function() {
        loadFixtures('template.html');
        region = new marionette.Region({el: '.container'});
    });

    it('initializes', function() {
        var headerView = new HeaderView({
            collection: new Tasks({
                ignoreLocalStorage: true
            })
        });
        expect(headerView).toBeDefined();
        region.show(headerView);
    });

    it('should fire onInputConfirm on keypress', function(){
        var headerView = getSpyHeader();
        region.show(headerView);
        eventHelpers.simulateKeyPress(headerView.ui.input, KeyCodes.delete);
        expect(headerView.onInputConfirm).toHaveBeenCalled();
    });

    it('should do nothing if enter key is pressed and no text is entered', function(){
        var headerView = new HeaderView({
            collection: new Tasks()
        });
        region.show(headerView);
        eventHelpers.simulateKeyPress(headerView.ui.input, KeyCodes.return);
        expect(headerView.masterCollection.length).toEqual(0);
    });

    it('should do nothing if empty text is in input when enter key is pressed', function(){
        var headerView = new HeaderView({
            collection: new Tasks()
        });
        region.show(headerView);
        // Blank spaces used as an example of empty text.
        var testString = "   "
        eventHelpers.insertChar(headerView.ui.input, testString)
        eventHelpers.simulateKeyPress(headerView.ui.input, KeyCodes.return);
        expect(headerView.masterCollection.length).toEqual(0);
    });

    it('should create task when valid input', function(){
        var headerView = new HeaderView({
            collection: new Tasks()
        });
        region.show(headerView);
        var testString = "Hello, world";
        eventHelpers.insertChar(headerView.ui.input, testString);
        eventHelpers.simulateKeyPress(headerView.ui.input, KeyCodes.return);

        expect(headerView.masterCollection.length).toEqual(1);
        var taskTitle = headerView.masterCollection.at(0).attributes.title;
        expect(taskTitle).toBe(testString);
    });

});
});
