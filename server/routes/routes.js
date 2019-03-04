'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* maintained by gulp:create-route. Do not change how this works without checking that script */
var pages = ['login', 'logout', 'dashboard', 'assignments-page', 'everyones-work', 'assignment-final-grades', 'account', 'about', 'course-section-management', 'assignment-editor', 'user-management', 'create-assignment', 'translation-manager', 'database-maintenance',

//'administrator',
'add-user', 'settings', 'my-account', 'reset-password', 'confirm-password-reset', 'course-page', 'masquerade', 'stop-masquerading', 'task-template', 'assign-to-section', 'testing-ground', 'task-status-table', 'onboarding', 'initial-password-change', 'volunteer-pool', 'section', 'reallocation', 'section'];

var pageConfigs = [];

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = (0, _getIterator3.default)(pages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var page = _step.value;

        pageConfigs.push(require('./route-configs/' + page));
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

module.exports = pageConfigs;