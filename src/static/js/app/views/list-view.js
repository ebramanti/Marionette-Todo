define(function (require, exports, module) {

var marionette = require('marionette');
var ItemView = require('app/views/item-view').ItemView;
var template = require('hbs!../templates/item-view');

var ListView =  marionette.CollectionView.extend({
    itemView : ItemView,
    initialize : function(options){

    }
});

exports.ListView = ListView;

});
