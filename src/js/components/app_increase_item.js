/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app_actions.js');

var IncreaseItem =
  React.createClass({
    handleClick:function() {
      AppActions.increaseItem(this.props.index);
    },
    render:function() {
      return <button onClick={this.handleClick}>+</button>
    }
  });

module.exports = IncreaseItem;
