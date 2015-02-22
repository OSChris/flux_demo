var AppDispatcher = require('../dispatchers/app_dispatcher.js');
var AppConstants  = require('../constants/app_constants.js');
var merge         = require('react/lib/merge');
var EventEmitter  = require('events').EventEmitter;

var CHANGE_EVENT = "change";


// Just using this here since I'm not using a DB for persistence, normally this
// wouldn't go into a store.
var _catalog = [
  { id: 1, title: "Widget 1", cost: 1 },
  { id: 2, title: "Widget 2", cost: 2 },
  { id: 3, title: "Widget 3", cost: 3 }
];

var _cartItems = [];

function _removeItem(index) {
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index) {
  _cartItems[index].qty++;
}

function _decreaseItem(index) {
  if(_cartItems[index].qty > 1) {
    _cartItems[index].qty--;
  } else {
    _removeItem(index);
  }
}

function _addItem(item) {
  if(!item.inCart) {
    item['qty']    = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  } else {
    _cartItems.forEach(function(cartItem, i) {
      if(cartItem.id === item.id) {
        _increaseItem(i);
      }
    })
  }
}

var AppStore = merge(EventEmitter.prototype, {
  emitChange:function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCart:function(callback) {
    return _cartItems;
  },

  getCatalog:function(callback) {
    return _catalog;
  },

  dispatcherIndex:AppDispatcher.register(function(payload) {
    var action = payload.action; // this is our action from handleViewAction in app_dispatcher.js

    switch(action.actionType){
      case AppConstants.ADD_ITEM:
        _addItem(action.item);
        break;
      case AppConstants.REMOVE_ITEM:
        _removeItem(action.index);
        break;
      case AppConstants.INCREASE_ITEM:
        _increaseItem(action.index);
        break;
      case AppConstants.DECREASE_ITEM:
        _decreaseItem(action.index);
        break;
    }
    AppStore.emitChange();

    return true; // this is going into a queue of promises and in order for it to resolve
                 // we have to return true
  })
});

module.exports = AppStore;
