/** @jsx React.DOM */
var React = require('react');
var Catalog =  require('../components/app_catalog.js');
var Cart =  require('../components/app_cart.js');

var APP =
  React.createClass({
    render:function() {
      return (
        <div>
          <h1>Let's Shop</h1>
          <Catalog />
          <h1>Cart</h1>
          <Cart />
        </div>
      )
    }
  });

module.exports = APP;
