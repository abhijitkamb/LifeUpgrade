'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashOmit = require('lodash/omit');

var _lodashOmit2 = _interopRequireDefault(_lodashOmit);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var componentFromProp = function componentFromProp(propName) {
  return function (props) {
    return _createElement2['default'](props[propName], _lodashOmit2['default'](props, propName));
  };
};

exports['default'] = _createHelper2['default'](componentFromProp, 'componentFromProp');
module.exports = exports['default'];