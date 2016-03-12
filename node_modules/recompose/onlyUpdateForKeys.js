'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashPick = require('lodash/pick');

var _lodashPick2 = _interopRequireDefault(_lodashPick);

var _shouldUpdate = require('./shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _shallowEqual = require('./shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys, BaseComponent) {
  return _shouldUpdate2['default'](function (props, nextProps) {
    return !_shallowEqual2['default'](_lodashPick2['default'](nextProps, propKeys), _lodashPick2['default'](props, propKeys));
  }, BaseComponent);
};

exports['default'] = _createHelper2['default'](onlyUpdateForKeys, 'onlyUpdateForKeys');
module.exports = exports['default'];