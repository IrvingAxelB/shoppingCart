var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var assign = require('react/lib/Object.assign');

var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

// Catalog
var _catalog = [];

for(var i = 1; i < 9; i++){
  _catalog.push({
    'id': 'Widget' + i,
    'title': 'Widget #' + i,
    'summary': 'This is an awesome widget!',
    'description': 'Lerem ipsum dolor sit ametconssectetur adipisicing elit.
      Ducimus, commodi.',
    'cost': i
  });
}

// Cart Items & functionality
var _cartItems = [];

function _removeItem(index) {
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index) {
  _cartItems[index].qty++;
}

function _decreaseItem(index) {
  if(_cartItems[index].qty > 1){
    _cartItems[index].qty--;
  } else {
    _removeItem(index);
  }
}

function _addItem(item) {
  if(!item.inCart){
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  } else {
    _cartItems.forEach( function() {
      if(_cartItems.id === item.id){
        _increaseItem(i);
      }
    });
  }
}

function _cartTotals() {
  var qty = 0, total = 0;
  _cartItems.forEach( function(_cartItem) {
    qty += _cartItem.qty;
    total += _cartItem.qty * _cartItem.cost;
  });
  return {'qty': qty, 'total': total};
}

// extending AppStore with EventEmitter
var AppStore = assign(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getCart: function() {
    return _cartItems;
  },

  getCatalog: function() {
    return _catalog;
  },

  getCartTotals: function() {
    return _cartTotals();
  },

  dispatcherIndex: AppDispatcher.register( function(payload) {
    // this is the action from the handleViewAction
    var action = payload.action;
    switch(action.actionType){
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;

      case AppConstants.REMOVE_ITEM:
        _removeItem(payload.action.index);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;

      case AppConstants.DECREASE_ITEM:
        _decreaseItem(payload.action.index);
        break;
    }
    AppStore.emitChange();

    return true;
  })
})

module.exports =AppStore;
