'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _transitions = require('./styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _uniqueId = require('./utils/unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _clearfix = require('./clearfix');

var _clearfix2 = _interopRequireDefault(_clearfix);

var _focusRipple = require('./ripples/focus-ripple');

var _focusRipple2 = _interopRequireDefault(_focusRipple);

var _touchRipple = require('./ripples/touch-ripple');

var _touchRipple2 = _interopRequireDefault(_touchRipple);

var _paper = require('./paper');

var _paper2 = _interopRequireDefault(_paper);

var _getMuiTheme = require('./styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getStyles(props, state) {
  var baseTheme = state.muiTheme.baseTheme;


  return {
    root: {
      position: 'relative',
      cursor: props.disabled ? 'default' : 'pointer',
      overflow: 'visible',
      display: 'table',
      height: 'auto',
      width: '100%'
    },
    input: {
      position: 'absolute',
      cursor: props.disabled ? 'default' : 'pointer',
      pointerEvents: 'all',
      opacity: 0,
      width: '100%',
      height: '100%',
      zIndex: 2,
      left: 0,
      boxSizing: 'border-box',
      padding: 0,
      margin: 0
    },
    controls: {
      width: '100%',
      height: '100%'
    },
    label: {
      float: 'left',
      position: 'relative',
      display: 'block',
      width: 'calc(100% - 60px)',
      lineHeight: '24px',
      color: baseTheme.palette.textColor,
      fontFamily: baseTheme.fontFamily
    },
    wrap: {
      transition: _transitions2.default.easeOut(),
      float: 'left',
      position: 'relative',
      display: 'block',
      width: 60 - baseTheme.spacing.desktopGutterLess,
      marginRight: props.labelPosition === 'right' ? baseTheme.spacing.desktopGutterLess : 0,
      marginLeft: props.labelPosition === 'left' ? baseTheme.spacing.desktopGutterLess : 0
    },
    ripple: {
      color: props.rippleColor || baseTheme.palette.primary1Color,
      height: '200%',
      width: '200%',
      top: -12,
      left: -12
    }
  };
}

var EnhancedSwitch = _react2.default.createClass({
  displayName: 'EnhancedSwitch',


  propTypes: {
    checked: _react2.default.PropTypes.bool,

    /**
     * The css class name of the root element.
     */
    className: _react2.default.PropTypes.string,
    defaultSwitched: _react2.default.PropTypes.bool,
    disableFocusRipple: _react2.default.PropTypes.bool,
    disableTouchRipple: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    iconStyle: _react2.default.PropTypes.object,
    id: _react2.default.PropTypes.string,
    inputStyle: _react2.default.PropTypes.object,
    inputType: _react2.default.PropTypes.string.isRequired,
    label: _react2.default.PropTypes.node,
    labelPosition: _react2.default.PropTypes.oneOf(['left', 'right']),
    labelStyle: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    onBlur: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    onMouseDown: _react2.default.PropTypes.func,
    onMouseLeave: _react2.default.PropTypes.func,
    onMouseUp: _react2.default.PropTypes.func,
    onParentShouldUpdate: _react2.default.PropTypes.func.isRequired,
    onSwitch: _react2.default.PropTypes.func,
    onTouchEnd: _react2.default.PropTypes.func,
    onTouchStart: _react2.default.PropTypes.func,
    required: _react2.default.PropTypes.bool,
    rippleColor: _react2.default.PropTypes.string,
    rippleStyle: _react2.default.PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: _react2.default.PropTypes.object,
    switchElement: _react2.default.PropTypes.element.isRequired,
    switched: _react2.default.PropTypes.bool.isRequired,
    thumbStyle: _react2.default.PropTypes.object,
    trackStyle: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.string
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  childContextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      isKeyboardFocused: false,
      parentWidth: 100,
      muiTheme: this.context.muiTheme || (0, _getMuiTheme2.default)()
    };
  },
  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },
  componentDidMount: function componentDidMount() {
    var inputNode = _reactDom2.default.findDOMNode(this.refs.checkbox);
    if (!this.props.switched || inputNode.checked !== this.props.switched) {
      this.props.onParentShouldUpdate(inputNode.checked);
    }

    this._handleResize();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasToggledProp = nextProps.hasOwnProperty('toggled');
    var hasNewDefaultProp = nextProps.hasOwnProperty('defaultSwitched') && nextProps.defaultSwitched !== this.props.defaultSwitched;

    var newState = {
      muiTheme: nextContext.muiTheme || this.state.muiTheme
    };

    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasToggledProp) {
      newState.switched = nextProps.toggled;
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.switched = nextProps.defaultSwitched;
    }

    if (newState.switched !== undefined && newState.switched !== this.props.switched) {
      this.props.onParentShouldUpdate(newState.switched);
    }

    this.setState(newState);
  },
  getEvenWidth: function getEvenWidth() {
    return parseInt(window.getComputedStyle(_reactDom2.default.findDOMNode(this.refs.root)).getPropertyValue('width'), 10);
  },
  isSwitched: function isSwitched() {
    return _reactDom2.default.findDOMNode(this.refs.checkbox).checked;
  },


  // no callback here because there is no event
  setSwitched: function setSwitched(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      this.props.onParentShouldUpdate(newSwitchedValue);
      _reactDom2.default.findDOMNode(this.refs.checkbox).checked = newSwitchedValue;
    } else {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Cannot call set method while checked is defined as a property.') : undefined;
    }
  },
  getValue: function getValue() {
    return _reactDom2.default.findDOMNode(this.refs.checkbox).value;
  },
  isKeyboardFocused: function isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },
  _handleChange: function _handleChange(event) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });

    var isInputChecked = _reactDom2.default.findDOMNode(this.refs.checkbox).checked;

    if (!this.props.hasOwnProperty('checked')) {
      this.props.onParentShouldUpdate(isInputChecked);
    }
    if (this.props.onSwitch) {
      this.props.onSwitch(event, isInputChecked);
    }
  },


  // Checkbox inputs only use SPACE to change their state. Using ENTER will
  // update the ui but not the input.
  _handleWindowKeydown: function _handleWindowKeydown(event) {
    if ((0, _keycode2.default)(event) === 'tab') {
      this._tabPressed = true;
    }
    if ((0, _keycode2.default)(event) === 'space' && this.state.isKeyboardFocused) {
      this._handleChange(event);
    }
  },
  _handleWindowKeyup: function _handleWindowKeyup(event) {
    if ((0, _keycode2.default)(event) === 'space' && this.state.isKeyboardFocused) {
      this._handleChange(event);
    }
  },


  /**
   * Because both the ripples and the checkbox input cannot share pointer
   * events, the checkbox input takes control of pointer events and calls
   * ripple animations manually.
   */
  _handleMouseDown: function _handleMouseDown(event) {
    //only listen to left clicks
    if (event.button === 0) {
      this.refs.touchRipple.start(event);
    }
  },
  _handleMouseUp: function _handleMouseUp() {
    this.refs.touchRipple.end();
  },
  _handleMouseLeave: function _handleMouseLeave() {
    this.refs.touchRipple.end();
  },
  _handleTouchStart: function _handleTouchStart(event) {
    this.refs.touchRipple.start(event);
  },
  _handleTouchEnd: function _handleTouchEnd() {
    this.refs.touchRipple.end();
  },
  _handleBlur: function _handleBlur(event) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  },
  _handleFocus: function _handleFocus(event) {
    var _this = this;

    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function () {
      if (_this._tabPressed) {
        _this.setState({
          isKeyboardFocused: true
        });
      }
    }, 150);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  },
  _handleResize: function _handleResize() {
    this.setState({ parentWidth: this.getEvenWidth() });
  },
  render: function render() {
    var _props = this.props;
    var name = _props.name;
    var value = _props.value;
    var label = _props.label;
    var onSwitch = _props.onSwitch;
    var defaultSwitched = _props.defaultSwitched;
    var onBlur = _props.onBlur;
    var onFocus = _props.onFocus;
    var onMouseUp = _props.onMouseUp;
    var onMouseDown = _props.onMouseDown;
    var onMouseLeave = _props.onMouseLeave;
    var onTouchStart = _props.onTouchStart;
    var onTouchEnd = _props.onTouchEnd;
    var disableTouchRipple = _props.disableTouchRipple;
    var disableFocusRipple = _props.disableFocusRipple;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['name', 'value', 'label', 'onSwitch', 'defaultSwitched', 'onBlur', 'onFocus', 'onMouseUp', 'onMouseDown', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'disableTouchRipple', 'disableFocusRipple', 'className']);

    var prepareStyles = this.state.muiTheme.prepareStyles;


    var styles = getStyles(this.props, this.state);
    var wrapStyles = (0, _simpleAssign2.default)(styles.wrap, this.props.iconStyle);
    var rippleStyle = (0, _simpleAssign2.default)(styles.ripple, this.props.rippleStyle);

    if (this.props.thumbStyle) {
      wrapStyles.marginLeft /= 2;
      wrapStyles.marginRight /= 2;
    }

    var inputId = this.props.id || _uniqueId2.default.generate();

    var labelStyle = (0, _simpleAssign2.default)(styles.label, this.props.labelStyle);
    var labelElement = this.props.label ? _react2.default.createElement(
      'label',
      { style: prepareStyles(labelStyle), htmlFor: inputId },
      this.props.label
    ) : null;

    var inputProps = {
      ref: 'checkbox',
      type: this.props.inputType,
      style: prepareStyles((0, _simpleAssign2.default)(styles.input, this.props.inputStyle)),
      name: this.props.name,
      value: this.props.value,
      defaultChecked: this.props.defaultSwitched,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus
    };

    var hideTouchRipple = this.props.disabled || disableTouchRipple;

    if (!hideTouchRipple) {
      inputProps.onMouseUp = this._handleMouseUp;
      inputProps.onMouseDown = this._handleMouseDown;
      inputProps.onMouseLeave = this._handleMouseLeave;
      inputProps.onTouchStart = this._handleTouchStart;
      inputProps.onTouchEnd = this._handleTouchEnd;
    }

    if (!this.props.hasOwnProperty('checkedLink')) {
      inputProps.onChange = this._handleChange;
    }

    var inputElement = _react2.default.createElement('input', _extends({}, other, inputProps));

    var touchRipple = _react2.default.createElement(_touchRipple2.default, {
      ref: 'touchRipple',
      key: 'touchRipple',
      style: rippleStyle,
      color: rippleStyle.color,
      muiTheme: this.state.muiTheme,
      centerRipple: true
    });

    var focusRipple = _react2.default.createElement(_focusRipple2.default, {
      key: 'focusRipple',
      innerStyle: rippleStyle,
      color: rippleStyle.color,
      muiTheme: this.state.muiTheme,
      show: this.state.isKeyboardFocused
    });

    var ripples = [hideTouchRipple ? null : touchRipple, this.props.disabled || disableFocusRipple ? null : focusRipple];

    // If toggle component (indicated by whether the style includes thumb) manually lay out
    // elements in order to nest ripple elements
    var switchElement = !this.props.thumbStyle ? _react2.default.createElement(
      'div',
      { style: prepareStyles(wrapStyles) },
      this.props.switchElement,
      ripples
    ) : _react2.default.createElement(
      'div',
      { style: prepareStyles(wrapStyles) },
      _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, this.props.trackStyle)) }),
      _react2.default.createElement(
        _paper2.default,
        { style: this.props.thumbStyle, zDepth: 1, circle: true },
        ' ',
        ripples,
        ' '
      )
    );

    var labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    var elementsInOrder = labelPositionExist && this.props.labelPosition.toUpperCase() === 'RIGHT' ? _react2.default.createElement(
      _clearfix2.default,
      { style: styles.controls },
      switchElement,
      labelElement
    ) : _react2.default.createElement(
      _clearfix2.default,
      { style: styles.controls },
      labelElement,
      switchElement
    );

    return _react2.default.createElement(
      'div',
      { ref: 'root', className: className, style: prepareStyles((0, _simpleAssign2.default)(styles.root, this.props.style)) },
      _react2.default.createElement(_reactEventListener2.default, {
        elementName: 'window',
        onKeyDown: this._handleWindowKeydown,
        onKeyUp: this._handleWindowKeyup,
        onResize: this._handleResize
      }),
      inputElement,
      elementsInOrder
    );
  }
});

exports.default = EnhancedSwitch;
module.exports = exports['default'];