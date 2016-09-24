'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jestSnapshot = require('jest-snapshot');

var _jestSnapshot2 = _interopRequireDefault(_jestSnapshot);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _jestDiff = require('jest-diff');

var _jestDiff2 = _interopRequireDefault(_jestDiff);

var _promptly = require('promptly');

var _promptly2 = _interopRequireDefault(_promptly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SnapshotRunner = function () {
  function SnapshotRunner(configDir) {
    (0, _classCallCheck3.default)(this, SnapshotRunner);

    this.configDir = configDir;
    this.kind = '';
  }

  (0, _createClass3.default)(SnapshotRunner, [{
    key: 'startKind',
    value: function startKind(kind) {
      var filePath = _path2.default.resolve(this.configDir, kind);

      var fakeJasmine = {
        Spec: function Spec() {}
      };
      this.state = _jestSnapshot2.default.getSnapshotState(fakeJasmine, filePath);
      this.kind = kind;
    }
  }, {
    key: 'runStory',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(story, _ref2) {
        var update = _ref2.update;
        var interactive = _ref2.interactive;
        var snapshot, key, hasSnapshot, context, tree, renderer, actual, matches, pass, diffMessage, shouldUpdate;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.state.setSpecName(story.name);
                this.state.setCounter(0);
                snapshot = this.state.snapshot;
                key = story.name;
                hasSnapshot = snapshot.has(key);
                context = { kind: this.kind, story: story };
                tree = story.render(context);
                renderer = _reactTestRenderer2.default.create(tree);
                actual = renderer.toJSON();

                if (!(!snapshot.fileExists() || !hasSnapshot)) {
                  _context.next = 12;
                  break;
                }

                // If the file does not exist of snapshot of this name is not present
                // add it.
                snapshot.add(key, actual);
                return _context.abrupt('return', { state: 'added' });

              case 12:
                matches = snapshot.matches(key, actual);
                pass = matches.pass;

                if (!pass) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt('return', { state: 'matched' });

              case 16:
                if (!update) {
                  _context.next = 19;
                  break;
                }

                snapshot.add(key, actual);
                return _context.abrupt('return', { state: 'updated' });

              case 19:
                diffMessage = (0, _jestDiff2.default)(matches.expected.trim(), matches.actual.trim(), {
                  aAnnotation: 'Snapshot',
                  bAnnotation: 'Current story'
                });

                if (!interactive) {
                  _context.next = 27;
                  break;
                }

                _context.next = 23;
                return this.confirmUpate(diffMessage);

              case 23:
                shouldUpdate = _context.sent;

                if (!shouldUpdate) {
                  _context.next = 27;
                  break;
                }

                snapshot.add(key, actual);
                return _context.abrupt('return', { state: 'updated' });

              case 27:
                return _context.abrupt('return', { state: 'unmatched', message: diffMessage });

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function runStory(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return runStory;
    }()
  }, {
    key: 'endKind',
    value: function endKind(_ref3) {
      var update = _ref3.update;

      var snapshot = this.state.snapshot;
      if (update) {
        snapshot.removeUncheckedKeys();
      }
      snapshot.save(update);
    }
  }, {
    key: 'confirmUpate',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(diffMessage) {
        var ans;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                process.stdout.write('\nReceived story is different from stored snapshot.\n');
                process.stdout.write('  ' + diffMessage.split('\n').join('\n  '));
                _context2.next = 4;
                return _promptly2.default.prompt('Update snapshot? (y/n)');

              case 4:
                ans = _context2.sent;

              case 5:
                if (!(ans !== 'y' && ans !== 'n')) {
                  _context2.next = 12;
                  break;
                }

                process.stdout.write('Enter only y (yes) or n (no)\n');
                _context2.next = 9;
                return _promptly2.default.prompt('Update snapshot? (y/n)');

              case 9:
                ans = _context2.sent;
                _context2.next = 5;
                break;

              case 12:
                process.stdout.write('\n');

                return _context2.abrupt('return', ans === 'y');

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function confirmUpate(_x3) {
        return _ref4.apply(this, arguments);
      }

      return confirmUpate;
    }()
  }]);
  return SnapshotRunner;
}();

exports.default = SnapshotRunner;