'use strict';

var _react_constants = require('../../utils/react_constants');

exports.get = function (req, res) {
    if (req.App.user === undefined) {
        return res.redirect('/?url=' + encodeURIComponent(req.originalUrl));
    }
    res.render('./task-status-table', {
        scripts: ['/static/react_apps.js'],
        userId: req.App.user.userId,
        assignmentId: req.params.assignmentId,
        hasInstructorPrivilege: (0, _react_constants.canRoleAccess)(req.App.user.role, _react_constants.ROLES.TEACHER)
    });
};