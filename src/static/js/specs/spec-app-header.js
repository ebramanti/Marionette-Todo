define(function(require, exports, module) {

var marionette = require('marionette');
var Tasks = require('app/collections/tasks').Tasks;
var HeaderView = require('app/views/header-view').HeaderView;
var SpecHelpers = require('spec-helpers');

describe('my header view', function() {
    var region;

    beforeEach(function() {
        loadFixtures('template.html');
        region = new marionette.Region({el: '.container'})
    });

    it('initializes', function() {
        var headerView = new HeaderView({collection: new Tasks()});
        expect(headerView).toBeDefined();
        region.show(headerView);
    });

    it('should fire onInputConfirm on keypress', function(){
        var headerView = new HeaderView({collection: new Tasks()});
        region.show(headerView);
        spyOn(headerView, 'onInputConfirm');
        SpecHelpers.Events.simulateKeyDown(headerView.ui.input, SpecHelpers.KeyCodes.delete);
        expect(headerView.onInputConfirm).toHaveBeenCalled();
    });

    it('should do nothing if enter key is pressed and no text is entered', function(){

    });

    it('should do nothing if empty text is in input when enter key is pressed', function(){

    });

    it('should create task when valid input', function(){

    });

});
});
