'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashOmit = require('lodash/omit');

var _lodashOmit2 = _interopRequireDefault(_lodashOmit);

var _lodashPick = require('lodash/pick');

var _lodashPick2 = _interopRequireDefault(_lodashPick);

var _lodashMapKeys = require('lodash/mapKeys');

var _lodashMapKeys2 = _interopRequireDefault(_lodashMapKeys);

var _mapProps = require('./mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var keys = Object.keys;

var renameProps = function renameProps(nameMap, BaseComponent) {
  return _mapProps2['default'](function (props) {
    return _extends({}, _lodashOmit2['default'](props, keys(nameMap)), _lodashMapKeys2['default'](_lodashPick2['default'](props, keys(nameMap)), function (_, oldName) {
      return nameMap[oldName];
    }));
  }, BaseComponent);
};

exports['default'] = _createHelper2['default'](renameProps, 'renameProps');
module.exports = exports['default'];