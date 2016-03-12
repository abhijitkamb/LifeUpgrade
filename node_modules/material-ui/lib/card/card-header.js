'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _getMuiTheme = require('../styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, state) {
  var card = state.muiTheme.card;


  return {
    root: {
      height: 72,
      padding: 16,
      fontWeight: card.fontWeight,
      boxSizing: 'border-box',
      position: 'relative'
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    avatar: {
      marginRight: 16
    },
    title: {
      color: props.titleColor || card.titleColor,
      display: 'block',
      fontSize: 15
    },
    subtitle: {
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
      fontSize: 14
    }
  };
}

var CardHeader = _react2.default.createClass({
  displayName: 'CardHeader',


  propTypes: {
    actAsExpander: _react2.default.PropTypes.bool,
    avatar: _react2.default.PropTypes.node,
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
    textStyle: _react2.default.PropTypes.object,
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

  getDefaultProps: function getDefaultProps() {
    return {
      avatar: null
    };
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
    var rootStyle = (0, _simpleAssign2.default)(styles.root, this.props.style);
    var textStyle = (0, _simpleAssign2.default)(styles.text, this.props.textStyle);
    var titleStyle = (0, _simpleAssign2.default)(styles.title, this.props.titleStyle);
    var subtitleStyle = (0, _simpleAssign2.default)(styles.subtitle, this.props.subtitleStyle);

    var avatar = this.props.avatar;
    if (_react2.default.isValidElement(this.props.avatar)) {
      avatar = _react2.default.cloneElement(avatar, {
        style: (0, _simpleAssign2.default)(styles.avatar, avatar.props.style)
      });
    } else if (avatar !== null) {
      avatar = _react2.default.createElement(_avatar2.default, { src: this.props.avatar, style: styles.avatar });
    }

    return _react2.default.createElement(
      'div',
      _extends({}, this.props, { style: prepareStyles(rootStyle) }),
      avatar,
      _react2.default.createElement(
        'div',
        { style: prepareStyles(textStyle) },
        _react2.default.createElement(
          'span',
          { style: prepareStyles(titleStyle) },
          this.props.title
        ),
        _react2.default.createElement(
          'span',
          { style: prepareStyles(subtitleStyle) },
          this.props.subtitle
        )
      ),
      this.props.children
    );
  }
});

exports.default = CardHeader;
module.exports = exports['default'];