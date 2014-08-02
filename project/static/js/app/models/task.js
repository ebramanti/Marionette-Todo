// Model for tasks in Todo app
define(function( require, exports, module ){

var backbone = require('backbone');

var Status = {
    Active: 'active',
    Completed: 'completed'
}

var Task = backbone.Model.extend({
    defaults: {
        title: null,
        isActive: true,
        date: null,
        localStorage: true
    },
    initialize: function() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
        this.set('date', Date.now());
    },
    toggleIsActive: function() {
        if (this.localStorage) {
            this.set('isActive', !this.get('isActive')).save();
        } else {
            this.set('isActive', !this.get('isActive'));
        }
    }
});

exports.Task = Task;
exports.Status = Status;

});
