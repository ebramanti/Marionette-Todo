define(function (require, exports, module) {

var marionette = require('marionette');
var TaskItemView = require('app/views/item-view').TaskItemView;
var template = require('hbs!../templates/item-view');

var ListView =  marionette.CollectionView.extend({
    template: template,
    itemView : TaskItemView,
    initialize : function(){

    },
    ui : {

    },
    events : {

    }
});

exports.ListView = ListView;

});
