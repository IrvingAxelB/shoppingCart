var Dispatcher = require('flux').Dispatcher;

// utility in the react library, like extends
var assign = require('react/lib/Object.assign');

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action){
    console.log('action', action);

    // this is the dispatch method inside of flux
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  }
});

module.exports = AppDispatcher;