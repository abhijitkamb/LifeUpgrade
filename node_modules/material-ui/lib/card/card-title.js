'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('../styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, state) {
  var card = state.muiTheme.card;


  return {
    root: {
      padding: 16,
      position: 'relative'
    },
    title: {
      fontSize: 24,
      color: props.titleColor || card.titleColor,
      display: 'block',
      lineHeight: '36px'
    },
    subtitle: {
      fontSize: 14,
      color: props.subtitleColor || card.subtitleColor,
      display: 'block'
    }
  };
}

var CardTitle = _react2.default.createClass({
  displayName: 'CardTitle',


  propTypes: {
    actAsExpander: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    expandable: _react2.default.PropTypes.bool,
    showExpandableButton: _react2.default.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: _react2.default.PropTypes.object,
    subtitle: _react2.default.PropTypes.node,
    subtitleColor: _react2.default.PropTypes.string,
    subtitleStyle: _react2.default.PropTypes.object,
    title: _react2.default.PropTypes.node,
    titleColor: _react2.default.PropTypes.string,
    titleStyle: _react2.default.PropTypes.object
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  childContextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme || (0, _getMuiTheme2.default)()
    };
  },
  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme
    });
  },
  render: function render() {
    var prepareStyles = this.state.muiTheme.prepareStyles;


    var styles = getStyles(this.props, this.state);
    var rootStyle = (0, _simpleAssign2.default)({}, styles.root, this.props.style);
    var titleStyle = (0, _simpleAssign2.default)({}, styles.title, this.props.titleStyle);
    var subtitleStyle = (0, _simpleAssign2.default)({}, styles.subtitle, this.props.subtitleStyle);

    return _react2.default.createElement(
      'div',
      _extends({}, this.props, { style: prepareStyles(rootStyle) }),
      _react2.default.createElement(
        'span',
        { style: prepareStyles(titleStyle) },
        this.props.title
      ),
      _react2.default.createElement(
        'span',
        { style: prepareStyles(subtitleStyle) },
        this.props.subtitle
      ),
      this.props.children
    );
  }
});

exports.default = CardTitle;
module.exports = exports['default'];