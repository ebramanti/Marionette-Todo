// Model for tasks in Todo app
define(function( require, exports, module ){

var backbone = require('backbone');
var LocalStorage = require('backbone/localstorage');

var Status = {
    Active: 'active',
    Completed: 'completed'
}

var Task = backbone.Model.extend({
    localStorage: new LocalStorage('task-list'),
    defaults: {
        title: null,
        isActive: true,
        date: null
    },
    initialize: function() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
        this.set('date', Date.now());
    },
    toggleIsActive: function() {
        this.set('isActive', !this.get('isActive'));
    }
});

exports.Task = Task;
exports.Status = Status;

});
