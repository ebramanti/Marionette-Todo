// Model for tasks in Todo app
define(function( require, exports, module ){

var backbone = require('backbone');
var Task = backbone.Model.extend({
    defaults: {
        //empty when user creates a task
        title: '',

        isActive: true,
        date: undefined
    },
    initialize: function() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
        this.set('date', Date.now());
    },
    toggleIsActive: function() {
        return !this.get('isActive');
    }
});

exports.Task = Task;

});
