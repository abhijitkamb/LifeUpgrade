'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transitions = require('./styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _propTypes = require('./utils/prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _enhancedButton = require('./enhanced-button');

var _enhancedButton2 = _interopRequireDefault(_enhancedButton);

var _fontIcon = require('./font-icon');

var _fontIcon2 = _interopRequireDefault(_fontIcon);

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _children = require('./utils/children');

var _children2 = _interopRequireDefault(_children);

var _getMuiTheme = require('./styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getStyles(props, state) {
  var baseTheme = state.muiTheme.baseTheme;


  return {
    root: {
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'visible',
      transition: _transitions2.default.easeOut(),
      padding: baseTheme.spacing.iconSize / 2,
      width: baseTheme.spacing.iconSize * 2,
      height: baseTheme.spacing.iconSize * 2,
      fontSize: 0
    },
    tooltip: {
      boxSizing: 'border-box'
    },
    icon: {
      color: baseTheme.palette.textColor,
      fill: baseTheme.palette.textColor
    },
    overlay: {
      position: 'relative',
      top: 0,
      width: '100%',
      height: '100%',
      background: baseTheme.palette.disabledColor
    },
    disabled: {
      color: baseTheme.palette.disabledColor,
      fill: baseTheme.palette.disabledColor
    }
  };
}

var IconButton = _react2.default.createClass({
  displayName: 'IconButton',


  propTypes: {
    /**
     * Can be used to pass a font icon as the icon for the button.
     */
    children: _react2.default.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: _react2.default.PropTypes.string,

    /**
     * Disables the icon button.
     */
    disabled: _react2.default.PropTypes.bool,

    /**
     * If you are using a stylesheet for your
     * icons, enter the class name for the icon to be used here.
     */
    iconClassName: _react2.default.PropTypes.string,

    /**
     * Overrides the inline-styles of the icon element.
     */
    iconStyle: _react2.default.PropTypes.object,

    /**
     * Callback function for when the component loses focus.
     */
    onBlur: _react2.default.PropTypes.func,

    /**
     * Callback function for when the component gains focus.
     */
    onFocus: _react2.default.PropTypes.func,

    /**
     * Callback function for when the component
     * receives keyboard focus.
     */
    onKeyboardFocus: _react2.default.PropTypes.func,

    /**
     * Callback function for when mouse enters element.
     */
    onMouseEnter: _react2.default.PropTypes.func,

    /**
     * Callback function for when mouse leaves element.
     */
    onMouseLeave: _react2.default.PropTypes.func,

    /**
     * Callback function for when mouse goes out of element it works with disabled element.
     */
    onMouseOut: _react2.default.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: _react2.default.PropTypes.object,

    /**
     * The tooltip text to show.
     */
    tooltip: _react2.default.PropTypes.node,

    /**
     * Allows the tooltip to be viewed with different
     * alignments: "bottom-center", "top-center",
     * "bottom-right", "top-right", "bottom-left" and "top-left".
     */
    tooltipPosition: _propTypes2.default.cornersAndCenter,

    /**
     * Styles prop passed down to the tooltip.
     */
    tooltipStyles: _react2.default.PropTypes.object,

    /**
     * Prop for tooltip to make it larger for mobile.
     */
    touch: _react2.default.PropTypes.bool
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  childContextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      iconStyle: {},
      tooltipPosition: 'bottom-center',
      touch: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      tooltipShown: false,
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
  setKeyboardFocus: function setKeyboardFocus() {
    this.refs.button.setKeyboardFocus();
  },
  _showTooltip: function _showTooltip() {
    if (this.props.tooltip) {
      this.setState({ tooltipShown: true });
    }
  },
  _hideTooltip: function _hideTooltip() {
    if (this.props.tooltip) this.setState({ tooltipShown: false });
  },
  _handleBlur: function _handleBlur(event) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(event);
  },
  _handleFocus: function _handleFocus(event) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(event);
  },
  _handleMouseLeave: function _handleMouseLeave(event) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  },
  _handleMouseOut: function _handleMouseOut(event) {
    if (this.props.disabled) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(event);
  },
  _handleMouseEnter: function _handleMouseEnter(event) {
    this._showTooltip();
    if (this.props.onMouseEnter) this.props.onMouseEnter(event);
  },
  _handleKeyboardFocus: function _handleKeyboardFocus(event, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this._showTooltip();
      if (this.props.onFocus) this.props.onFocus(event);
    } else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(event);
    }

    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(event, keyboardFocused);
  },
  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var iconClassName = _props.iconClassName;
    var tooltip = _props.tooltip;
    var touch = _props.touch;
    var iconStyle = _props.iconStyle;

    var other = _objectWithoutProperties(_props, ['disabled', 'iconClassName', 'tooltip', 'touch', 'iconStyle']);

    var fonticon = undefined;

    var styles = getStyles(this.props, this.state);
    var tooltipPosition = this.props.tooltipPosition.split('-');

    var tooltipElement = tooltip ? _react2.default.createElement(_tooltip2.default, {
      ref: 'tooltip',
      label: tooltip,
      show: this.state.tooltipShown,
      touch: touch,
      style: (0, _simpleAssign2.default)(styles.tooltip, this.props.tooltipStyles),
      verticalPosition: tooltipPosition[0],
      horizontalPosition: tooltipPosition[1]
    }) : null;

    if (iconClassName) {
      var iconHoverColor = iconStyle.iconHoverColor;

      var iconStyleFontIcon = _objectWithoutProperties(iconStyle, ['iconHoverColor']);

      fonticon = _react2.default.createElement(
        _fontIcon2.default,
        {
          className: iconClassName,
          hoverColor: disabled ? null : iconHoverColor,
          style: (0, _simpleAssign2.default)(styles.icon, disabled && styles.disabled, iconStyleFontIcon)
        },
        this.props.children
      );
    }

    var childrenStyle = disabled ? (0, _simpleAssign2.default)({}, iconStyle, styles.disabled) : iconStyle;

    return _react2.default.createElement(
      _enhancedButton2.default,
      _extends({}, other, {
        ref: 'button',
        centerRipple: true,
        disabled: disabled,
        style: (0, _simpleAssign2.default)(styles.root, this.props.style),
        onBlur: this._handleBlur,
        onFocus: this._handleFocus,
        onMouseLeave: this._handleMouseLeave,
        onMouseEnter: this._handleMouseEnter,
        onMouseOut: this._handleMouseOut,
        onKeyboardFocus: this._handleKeyboardFocus
      }),
      tooltipElement,
      fonticon,
      _children2.default.extend(this.props.children, {
        style: childrenStyle
      })
    );
  }
});

exports.default = IconButton;
module.exports = exports['default'];