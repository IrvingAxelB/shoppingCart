var React = require('react');
var Link = require('react-router-component').Link;
var AppStore = require('../../stores/app-stores.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');

function cartTotals() {
  return AppStore.getCartTotals();
}

var CartSummary = React.createClass({
  // StoreWatchMixin will create the state and other functionality!
  mixins: [StoreWatchMixin(cartTotals)],
  render: function() {
    return (
      <div>
        <Link href='/cart' className='btn btn-success'>
          Cart Items: {this.state.qty} / ${this.state.total}
        </Link>
      </div>
    );
  }
});

module.exports = CartSummary;