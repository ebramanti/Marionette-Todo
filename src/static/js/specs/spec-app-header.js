define(function(require, exports, module) {

var marionette = require('marionette');
var Tasks = require('app/collections/tasks').Tasks;
var HeaderView = require('app/views/header-view').HeaderView;

describe('my header view', function() {
    beforeEach(function() {
        loadFixtures('template.html');
    });

    it('initializes', function() {
        console.log($('.container')[0])
        var region = new marionette.Region({el: '.container'});
        console.log(region.$el[0]);
        var headerView = new HeaderView(new Tasks());
        expect(headerView).not.toEqual(undefined);
        region.show(headerView);
    });

    it('should fire onInputConfirm on keypress', function(){

    });

    it('should do nothing if enter key is pressed and no text is entered', function(){

    });

    it('should do nothing if empty text is in input when enter key is pressed', function(){

    });

    it('should create task when valid input', function(){

    });

});
});
