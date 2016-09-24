'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var storybook, addons, channel;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            require(configPath);
            storybook = require('@kadira/storybook').getStorybook();
            addons = require('@kadira/storybook-addons').default;

            // Channel for addons is created by storybook manager from the client side.
            // We need to polyfill it for the server side.

            channel = new _events2.default();

            addons.setChannel(channel);
            _context.next = 8;
            return runner.run((0, _util.filterStorybook)(storybook, grep));

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0.stack);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var _test_runner = require('./test_runner');

var _test_runner2 = _interopRequireDefault(_test_runner);

var _storybook = require('@kadira/storybook');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _babel_config = require('@kadira/storybook/dist/server/babel_config');

var _babel_config2 = _interopRequireDefault(_babel_config);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from').option('-u, --update [boolean]', 'Update saved story snapshots').option('-i, --update-interactive [boolean]', 'Update saved story snapshots interactively').option('-g, --grep [string]', 'only test stories matching regexp').option('-w, --watch [boolean]', 'watch file changes and rerun tests').option('--polyfills [string]', 'add global polyfills').option('--loaders [string]', 'add loaders').parse(process.argv); /* eslint-disable */

var _program$configDir = _commander2.default.configDir;
var configDir = _program$configDir === undefined ? './.storybook' : _program$configDir;
var _program$polyfills = _commander2.default.polyfills;
var polyfillsPath = _program$polyfills === undefined ? require.resolve('./default_config/polyfills.js') : _program$polyfills;
var _program$loaders = _commander2.default.loaders;
var loadersPath = _program$loaders === undefined ? require.resolve('./default_config/loaders.js') : _program$loaders;
var grep = _commander2.default.grep;


var configPath = _path2.default.resolve('' + configDir, 'config');

var babelConfig = (0, _babel_config2.default)(configDir);

// cacheDir is webpack babel loader specific. We don't run webpack.
delete babelConfig.cacheDirectory;

require('babel-register')(babelConfig);
require('babel-polyfill');

// load loaders
var loaders = require(_path2.default.resolve(loadersPath));

(0, _keys2.default)(loaders).forEach(function (ext) {
  var loader = loaders[ext];
  require.extensions['.' + ext] = function (m, filepath) {
    m.exports = loader(filepath);
  };
});

// load polyfills
require(_path2.default.resolve(polyfillsPath));

// set userAgent so storybook knows we're storyshots
if (!global.navigator) {
  global.navigator = {};
};
global.navigator.userAgent = 'storyshots';

var runner = new _test_runner2.default(_commander2.default);

if (_commander2.default.watch) {
  var watcher = _chokidar2.default.watch('.', {
    ignored: 'node_modules', // TODO: Should node_modules also be watched?
    persistent: true
  });

  watcher.on('ready', function () {
    console.log('storybook-snapshot-test is in watch mode.');
    watcher.on('all', function () {
      // Need to remove the require cache. Because it containes modules before
      // changes were made.
      (0, _keys2.default)(require.cache).forEach(function (key) {
        delete require.cache[key];
      });

      main();
    });
  });
}

main();