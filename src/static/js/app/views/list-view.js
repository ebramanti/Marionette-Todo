define(function (require, exports, module) {

var marionette = require('marionette');
var ItemView = require('app/views/item-view').ItemView;
var template = require('hbs!../templates/list-view');

var ListView =  marionette.CollectionView.extend({
    tagName: 'ul',
    itemView : ItemView,
    itemViewContainer: '#task-list',
    initialize : function(){
    },

});

exports.ListView = ListView;

});
