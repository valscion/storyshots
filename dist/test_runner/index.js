'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _snapshot_runner = require('./snapshot_runner');

var _snapshot_runner2 = _interopRequireDefault(_snapshot_runner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Runner = function () {
  function Runner(options) {
    (0, _classCallCheck3.default)(this, Runner);
    var _options$configDir = options.configDir;
    var configDir = _options$configDir === undefined ? './.storybook' : _options$configDir;
    var update = options.update;
    var interactive = options.updateInteractive;


    this.configDir = configDir;
    this.update = update;
    this.interactive = interactive;

    this.testState = {
      added: 0,
      matched: 0,
      unmatched: 0,
      updated: 0,
      obsolete: 0,
      errored: 0
    };

    this.runner = new _snapshot_runner2.default(configDir);
  }

  (0, _createClass3.default)(Runner, [{
    key: 'updateState',
    value: function updateState(result) {
      this.testState[result.state]++;
      logState(result);
    }
  }, {
    key: 'completed',
    value: function completed() {
      logSummary(this.testState);
    }
  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(storybook) {
        var options, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, group, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, story, result;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = {
                  update: this.update,
                  interactive: this.interactive
                };
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 4;
                _iterator = (0, _getIterator3.default)(storybook);

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 54;
                  break;
                }

                group = _step.value;
                _context.prev = 8;

                this.runner.startKind(group.kind);
                this.updateState({ state: 'started-kind', name: group.kind });
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 14;
                _iterator2 = (0, _getIterator3.default)(group.stories);

              case 16:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 31;
                  break;
                }

                story = _step2.value;
                _context.prev = 18;
                _context.next = 21;
                return this.runner.runStory(story, options);

              case 21:
                result = _context.sent;

                this.updateState((0, _extends3.default)({}, result, { name: story.name }));
                _context.next = 28;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context['catch'](18);

                // Error on story
                this.updateState({ state: 'errored', message: _context.t0, name: story.name });

              case 28:
                _iteratorNormalCompletion2 = true;
                _context.next = 16;
                break;

              case 31:
                _context.next = 37;
                break;

              case 33:
                _context.prev = 33;
                _context.t1 = _context['catch'](14);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t1;

              case 37:
                _context.prev = 37;
                _context.prev = 38;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 40:
                _context.prev = 40;

                if (!_didIteratorError2) {
                  _context.next = 43;
                  break;
                }

                throw _iteratorError2;

              case 43:
                return _context.finish(40);

              case 44:
                return _context.finish(37);

              case 45:
                this.runner.endKind(options);
                _context.next = 51;
                break;

              case 48:
                _context.prev = 48;
                _context.t2 = _context['catch'](8);

                // Error on kind
                this.updateState({ state: 'errored-kind', message: _context.t2 });

              case 51:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 54:
                _context.next = 60;
                break;

              case 56:
                _context.prev = 56;
                _context.t3 = _context['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context.t3;

              case 60:
                _context.prev = 60;
                _context.prev = 61;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 63:
                _context.prev = 63;

                if (!_didIteratorError) {
                  _context.next = 66;
                  break;
                }

                throw _iteratorError;

              case 66:
                return _context.finish(63);

              case 67:
                return _context.finish(60);

              case 68:

                this.completed();

              case 69:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 56, 60, 68], [8, 48], [14, 33, 37, 45], [18, 25], [38,, 40, 44], [61,, 63, 67]]);
      }));

      function run(_x) {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return Runner;
}();

exports.default = Runner;


function logState(_ref2) {
  var state = _ref2.state;
  var name = _ref2.name;
  var message = _ref2.message;

  switch (state) {
    case 'added':
      process.stdout.write(_chalk2.default.cyan('+ ' + name + ': Added'));
      break;
    case 'updated':
      process.stdout.write(_chalk2.default.cyan('● ' + name + ': Updated'));
      break;
    case 'matched':
      process.stdout.write(_chalk2.default.green('✓ ' + name));
      break;
    case 'unmatched':
      process.stdout.write('\n');
      process.stdout.write(_chalk2.default.red('✗ ' + name + '\n'));
      process.stdout.write('  ' + message.split('\n').join('\n  '));
      process.stdout.write('\n');
      break;
    case 'errored':
    case 'errored-kind':
      process.stdout.write('\n');
      process.stdout.write(_chalk2.default.red('✗ ' + name + ': ERROR\n'));
      var output = message.stack || message;
      process.stdout.write(_chalk2.default.dim('  ' + output.split('\n').join('\n  ')));
      process.stdout.write('\n');
      break;
    case 'started-kind':
      process.stdout.write('\n');
      process.stdout.write(_chalk2.default.underline(name));
      break;
    default:
      process.stdout.write('Error occured when testing ' + state);
  }
  process.stdout.write('\n');
}

function logSummary(state) {
  var added = state.added;
  var matched = state.matched;
  var unmatched = state.unmatched;
  var updated = state.updated;
  var errored = state.errored;
  var obsolete = state.obsolete;

  var total = added + matched + unmatched + updated + errored;
  process.stdout.write(_chalk2.default.bold('\nTest Summary\n'));
  process.stdout.write('> ' + total + ' stories tested.\n');
  if (matched > 0) {
    process.stdout.write(_chalk2.default.green('> ' + matched + '/' + total + ' stories matched with snapshots.\n'));
  }
  if (unmatched > 0) {
    process.stdout.write(_chalk2.default.red('> ' + unmatched + '/' + total + ' differed from snapshots.\n'));
  }
  if (updated > 0) {
    process.stdout.write(_chalk2.default.cyan('> ' + updated + ' snapshots updated to match current stories.\n'));
  }
  if (added > 0) {
    process.stdout.write(_chalk2.default.cyan('> ' + added + ' snapshots newly added.\n'));
  }
  if (errored > 0) {
    process.stdout.write(_chalk2.default.red('> ' + errored + ' tests errored.\n'));
  }
  if (obsolete > 0) {
    process.stdout.write(_chalk2.default.cyan('> ' + obsolete + ' unused snapshots remaining. Run with -u to remove them.\n'));
  }
}