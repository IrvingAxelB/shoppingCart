var React = require('react');
var AppStore = require('../../stores/app-stores.js');

var RemoveFromCart = require('./app-removefromcart.js');
var Increase = require('./app-decreaseitem');
var Decrease = require('./app-increaseitem');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');

var Link = require('react-router-component').Link;

function cartItems() {
  return {items: AppStore.getCart()}
}

var Cart = React.createClass({
  mixins:[StoreWatchMixin(cartItems)],

  // // gets initial state of cart
  // getInitialState: function() {
  //   return cartItems();
  // },
  // // needs to be aware of changes in application
  // componentWillMount: function() {
  //   AppStore.addChangeListener(this._onChange)
  // },
  // // when it leaves this page it unmounts the listener from here!
  // componentWillUnmount: function() {
  //   AppStore.removeChangeListener(this._onChange);
  // },
  // // set the _onChange  : so if the state changes, it triggers within the listeners 
  // _onChange: function() {
  //   this.setState(cartItems());
  // },

  render: function() {
    var total = 0;
    var items = this.state.items.map( function(item, i) {
      var subtotal = item.cost * item.qty;
      total += subtotal;
      return (
        <tr key={i}>
          <td><RemoveFromCart index={i} /></td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>
            <Increase index={i} />
            <Decrease index={i} />
          </td>
          <td>${subtotal}</td>
        </tr>
      );
    });

    return (
      <div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Qty</th>
              <th></th>
              <th>Subtotal</th>
            </tr>
          </thead>
          
          <tbody>
            {items}
          </tbody>

          <tfoot>
            <td colSpan='4' className='text-right'>Total</td>
            <td>${total}</td>
          </tfoot>
        </table>
        <Link href='/'>Continue Shopping</Link>
      </div>
    );
  }
});

module.exports = Cart;
