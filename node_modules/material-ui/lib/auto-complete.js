'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _textField = require('./text-field');

var _textField2 = _interopRequireDefault(_textField);

var _menu = require('./menus/menu');

var _menu2 = _interopRequireDefault(_menu);

var _menuItem = require('./menus/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _divider = require('./divider');

var _divider2 = _interopRequireDefault(_divider);

var _popover = require('./popover/popover');

var _popover2 = _interopRequireDefault(_popover);

var _propTypes = require('./utils/prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getMuiTheme = require('./styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _deprecatedPropType = require('./utils/deprecatedPropType');

var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getStyles(props, state) {
  var anchorEl = state.anchorEl;
  var fullWidth = props.fullWidth;


  var styles = {
    root: {
      display: 'inline-block',
      position: 'relative',
      width: fullWidth ? '100%' : 256
    },
    menu: {
      width: '100%'
    },
    list: {
      display: 'block',
      width: fullWidth ? '100%' : 256
    },
    innerDiv: {
      overflow: 'hidden'
    }
  };

  if (anchorEl && fullWidth) {
    styles.popover = {
      width: anchorEl.clientWidth
    };
  }

  return styles;
}

var AutoComplete = _react2.default.createClass({
  displayName: 'AutoComplete',


  propTypes: {
    /**
     * Location of the anchor for the auto complete.
     */
    anchorOrigin: _propTypes2.default.origin,

    /**
     * If true, the auto complete is animated as it is toggled.
     */
    animated: _react2.default.PropTypes.bool,

    /**
     * Array of strings or nodes used to populate the list.
     */
    dataSource: _react2.default.PropTypes.array.isRequired,

    /**
     * Disables focus ripple when true.
     */
    disableFocusRipple: _react2.default.PropTypes.bool,

    /**
     * Override style prop for error.
     */
    errorStyle: _react2.default.PropTypes.object,

    /**
     * The error content to display.
     */
    errorText: _react2.default.PropTypes.string,

    /**
     * Function used to filter the auto complete.
     */
    filter: _react2.default.PropTypes.func,

    /**
     * The content to use for adding floating label element.
     */
    floatingLabelText: _react2.default.PropTypes.string,

    /**
     * If true, the field receives the property `width: 100%`.
     */
    fullWidth: _react2.default.PropTypes.bool,

    /**
     * The hint content to display.
     */
    hintText: _react2.default.PropTypes.string,

    /**
     * Override style for list.
     */
    listStyle: _react2.default.PropTypes.object,

    /**
     * The max number of search results to be shown.
     * By default it shows all the items which matches filter.
     */
    maxSearchResults: _react2.default.PropTypes.number,

    /**
     * Delay for closing time of the menu.
     */
    menuCloseDelay: _react2.default.PropTypes.number,

    /**
     * Props to be passed to menu.
     */
    menuProps: _react2.default.PropTypes.object,

    /**
     * Override style for menu.
     */
    menuStyle: _react2.default.PropTypes.object,

    /**
     * Callback function that is fired when the `TextField` loses focus.
     */
    onBlur: _react2.default.PropTypes.func,

    /**
     * Callback function that is fired when the `TextField` gains focus.
     */
    onFocus: _react2.default.PropTypes.func,

    /**
     * Gets called when list item is clicked or pressed enter.
     */
    onNewRequest: _react2.default.PropTypes.func,

    /**
     * Gets called each time the user updates the text field.
     */
    onUpdateInput: _react2.default.PropTypes.func,

    /**
     * Auto complete menu is open if true.
     */
    open: _react2.default.PropTypes.bool,

    /**
     * If true, the list item is showed when a focus event triggers.
     */
    openOnFocus: _react2.default.PropTypes.bool,

    /**
     * Text being input to auto complete.
     */
    searchText: _react2.default.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: _react2.default.PropTypes.object,

    /**
     * Origin for location of target.
     */
    targetOrigin: _propTypes2.default.origin,

    /**
     * If true, will update when focus event triggers.
     */
    triggerUpdateOnFocus: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.bool, 'Instead, use openOnFocus')
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  childContextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      animated: true,
      disableFocusRipple: true,
      filter: function filter(searchText, key) {
        return searchText !== '' && key.includes(searchText);
      },
      fullWidth: false,
      open: false,
      openOnFocus: false,
      onUpdateInput: function onUpdateInput() {},
      onNewRequest: function onNewRequest() {},
      searchText: '',
      menuCloseDelay: 200,
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left'
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      searchText: this.props.searchText,
      open: this.props.open,
      anchorEl: null,
      muiTheme: this.context.muiTheme || (0, _getMuiTheme2.default)(),
      focusTextField: true
    };
  },
  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },
  componentWillMount: function componentWillMount() {
    this.requestsList = [];
  },


  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.timerTouchTapCloseId);
    clearTimeout(this.timerBlurCloseId);
  },
  componentClickAway: function componentClickAway() {
    this.close();
  },


  timerTouchTapCloseId: undefined,
  timerBlurCloseId: undefined,

  close: function close() {
    this.setState({
      open: false,
      anchorEl: null
    });
  },
  setValue: function setValue(textValue) {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'setValue() is deprecated, use the searchText property.') : undefined;

    this.setState({
      searchText: textValue
    });
  },
  getValue: function getValue() {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'getValue() is deprecated.') : undefined;

    return this.state.searchText;
  },
  handleItemTouchTap: function handleItemTouchTap(event, child) {
    var _this = this;

    var dataSource = this.props.dataSource;
    var chosenRequest = undefined;
    var index = undefined;
    var searchText = undefined;

    if (typeof dataSource[0] === 'string') {
      chosenRequest = this.requestsList[parseInt(child.key, 10)];
      index = dataSource.indexOf(chosenRequest);
      searchText = dataSource[index];
    } else {
      chosenRequest = child.key;
      index = dataSource.indexOf(dataSource.filter(function (item) {
        return chosenRequest === item.text;
      })[0]);
      searchText = chosenRequest;
    }

    this.props.onNewRequest(chosenRequest, index);

    clearTimeout(this.timerBlurCloseId);
    this.timerTouchTapCloseId = setTimeout(function () {
      _this.setState({
        searchText: searchText
      });
      _this.close();
    }, this.props.menuCloseDelay);
  },
  handleKeyDown: function handleKeyDown(event) {
    switch ((0, _keycode2.default)(event)) {
      case 'enter':
        this.close();
        var searchText = this.state.searchText;
        if (searchText !== '') {
          this.props.onNewRequest(searchText, -1);
        }
        break;

      case 'esc':
        this.close();
        break;

      case 'down':
        event.preventDefault();
        this.setState({
          open: true,
          focusTextField: false,
          anchorEl: _reactDom2.default.findDOMNode(this.refs.searchTextField)
        });
        break;

      default:
        break;
    }
  },
  handleChange: function handleChange(event) {
    var _this2 = this;

    var searchText = event.target.value;

    // Make sure that we have a new searchText.
    // Fix an issue with a Cordova Webview
    if (searchText === this.state.searchText) {
      return;
    }

    this.setState({
      searchText: searchText,
      open: true,
      anchorEl: _reactDom2.default.findDOMNode(this.refs.searchTextField)
    }, function () {
      _this2.props.onUpdateInput(searchText, _this2.props.dataSource);
    });
  },
  handleBlur: function handleBlur(event) {
    var _this3 = this;

    // Run asynchronously to wait for a potential handleItemTouchTap() call.
    // The blur event occurs first on a click device and after on a touch device.
    if (this.state.focusTextField) {
      this.timerBlurCloseId = setTimeout(function () {
        _this3.close();
      }, 0);
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  },
  handleFocus: function handleFocus(event) {
    if (!this.state.open && (this.props.triggerUpdateOnFocus || this.props.openOnFocus)) {
      this.setState({
        open: true,
        anchorEl: _reactDom2.default.findDOMNode(this.refs.searchTextField)
      });
    }

    this.setState({
      focusTextField: true
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  },
  render: function render() {
    var _this4 = this;

    var _props = this.props;
    var anchorOrigin = _props.anchorOrigin;
    var animated = _props.animated;
    var style = _props.style;
    var errorStyle = _props.errorStyle;
    var floatingLabelText = _props.floatingLabelText;
    var hintText = _props.hintText;
    var fullWidth = _props.fullWidth;
    var menuStyle = _props.menuStyle;
    var menuProps = _props.menuProps;
    var listStyle = _props.listStyle;
    var targetOrigin = _props.targetOrigin;
    var disableFocusRipple = _props.disableFocusRipple;
    var triggerUpdateOnFocus = _props.triggerUpdateOnFocus;
    var openOnFocus = _props.openOnFocus;
    var maxSearchResults = _props.maxSearchResults;
    var dataSource = _props.dataSource;

    var other = _objectWithoutProperties(_props, ['anchorOrigin', 'animated', 'style', 'errorStyle', 'floatingLabelText', 'hintText', 'fullWidth', 'menuStyle', 'menuProps', 'listStyle', 'targetOrigin', 'disableFocusRipple', 'triggerUpdateOnFocus', 'openOnFocus', 'maxSearchResults', 'dataSource']);

    var _state = this.state;
    var open = _state.open;
    var anchorEl = _state.anchorEl;
    var searchText = _state.searchText;
    var focusTextField = _state.focusTextField;
    var prepareStyles = _state.muiTheme.prepareStyles;


    var styles = getStyles(this.props, this.state);

    var requestsList = [];

    dataSource.every(function (item) {
      switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
        case 'string':
          if (_this4.props.filter(searchText, item, item)) {
            requestsList.push(item);
          }
          break;

        case 'object':
          if (item && typeof item.text === 'string') {
            if (_this4.props.filter(searchText, item.text, item)) {
              requestsList.push(item);
            }
          }
          break;
      }

      return !(maxSearchResults && maxSearchResults > 0 && requestsList.length === maxSearchResults);
    });

    this.requestsList = requestsList;

    var menu = open && requestsList.length > 0 && _react2.default.createElement(
      _menu2.default,
      _extends({}, menuProps, {
        ref: 'menu',
        autoWidth: false,
        zDepth: 0,
        disableAutoFocus: focusTextField,
        onEscKeyDown: this.close,
        initiallyKeyboardFocused: false,
        onItemTouchTap: this.handleItemTouchTap,
        listStyle: (0, _simpleAssign2.default)(styles.list, listStyle),
        style: (0, _simpleAssign2.default)(styles.menu, menuStyle)
      }),
      requestsList.map(function (request, index) {
        switch (typeof request === 'undefined' ? 'undefined' : _typeof(request)) {
          case 'string':
            return _react2.default.createElement(_menuItem2.default, {
              disableFocusRipple: disableFocusRipple,
              innerDivStyle: styles.innerDiv,
              key: index,
              value: request,
              primaryText: request
            });

          case 'object':
            if (typeof request.text === 'string') {
              return _react2.default.cloneElement(request.value, {
                key: request.text,
                disableFocusRipple: disableFocusRipple
              });
            }

            return _react2.default.cloneElement(request, {
              disableFocusRipple: disableFocusRipple
            });

          default:
            return null;
        }
      })
    );

    return _react2.default.createElement(
      'div',
      { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) },
      _react2.default.createElement(_textField2.default, _extends({}, other, {
        ref: 'searchTextField',
        autoComplete: 'off',
        value: searchText,
        onChange: this.handleChange,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        floatingLabelText: floatingLabelText,
        hintText: hintText,
        fullWidth: fullWidth,
        multiLine: false,
        errorStyle: errorStyle
      })),
      _react2.default.createElement(
        _popover2.default,
        {
          style: styles.popover,
          anchorOrigin: anchorOrigin,
          targetOrigin: targetOrigin,
          open: open,
          anchorEl: anchorEl,
          useLayerForClickAway: false,
          onRequestClose: this.close,
          animated: animated
        },
        menu
      )
    );
  }
});

AutoComplete.levenshteinDistance = function (searchText, key) {
  var current = [];
  var prev = undefined;
  var value = undefined;

  for (var i = 0; i <= key.length; i++) {
    for (var j = 0; j <= searchText.length; j++) {
      if (i && j) {
        if (searchText.charAt(j - 1) === key.charAt(i - 1)) value = prev;else value = Math.min(current[j], current[j - 1], prev) + 1;
      } else {
        value = i + j;
      }
      prev = current[j];
      current[j] = value;
    }
  }
  return current.pop();
};

AutoComplete.noFilter = function () {
  return true;
};

AutoComplete.defaultFilter = AutoComplete.caseSensitiveFilter = function (searchText, key) {
  return searchText !== '' && key.includes(searchText);
};

AutoComplete.caseInsensitiveFilter = function (searchText, key) {
  return key.toLowerCase().includes(searchText.toLowerCase());
};

AutoComplete.levenshteinDistanceFilter = function (distanceLessThan) {
  if (distanceLessThan === undefined) {
    return AutoComplete.levenshteinDistance;
  } else if (typeof distanceLessThan !== 'number') {
    throw 'Error: AutoComplete.levenshteinDistanceFilter is a filter generator, not a filter!';
  }

  return function (s, k) {
    return AutoComplete.levenshteinDistance(s, k) < distanceLessThan;
  };
};

AutoComplete.fuzzyFilter = function (searchText, key) {
  if (searchText.length === 0) {
    return false;
  }

  var subMatchKey = key.substring(0, searchText.length);
  var distance = AutoComplete.levenshteinDistance(searchText.toLowerCase(), subMatchKey.toLowerCase());

  return searchText.length > 3 ? distance < 2 : distance === 0;
};

AutoComplete.Item = _menuItem2.default;
AutoComplete.Divider = _divider2.default;

exports.default = AutoComplete;
module.exports = exports['default'];