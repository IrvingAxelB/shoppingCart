var React = require('react');
var AppActions = require('../actions/app-actions');

var AddToCar = React.createClass({
  handler: function() {
    AppActions.addItem(this.props.item);
  },
  render: function() {
    return (
      <button onClick={this.handler}>Add To Cart</button>
    );
  }
});

module.exports = AddToCar;
