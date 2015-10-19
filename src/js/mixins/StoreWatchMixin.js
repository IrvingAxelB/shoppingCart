var React = require('react');
var AppStore = require('../stores/app-stores');

var StoreWatchMixin = function(cb) {
  return {
    // gets initial state of cart
    getInitialState: function() {
      return cb(this);
    },
    // needs to be aware of changes in application
    componentWillMount: function() {
      AppStore.addChangeListener(this._onChange)
    },
    // when it leaves this page it unmounts the listener from here!
    componentWillUnmount: function() {
      AppStore.removeChangeListener(this._onChange);
    },
    // set the _onChange  : so if the state changes, it triggers within the listeners 
    _onChange: function() {
      this.setState(cb(this));
    }
  };
}

module.exports = StoreWatchMixin;
