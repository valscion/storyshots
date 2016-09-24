'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
(0, _keys2.default)(document.defaultView).forEach(function (property) {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'storyshots'
};

global.localStorage = global.window.localStorage = {
  _data: {},
  setItem: function setItem(id, val) {
    return this._data[id] = String(val);
  },
  getItem: function getItem(id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },
  removeItem: function removeItem(id) {
    return delete this._data[id];
  },
  clear: function clear() {
    return this._data = {};
  }
};

window.matchMedia = function () {
  return { matches: true };
};