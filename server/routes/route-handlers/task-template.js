'use strict';

var _react_constants = require('../../utils/react_constants');

exports.get = function (req, res) {

    if (req.App.user === undefined) {
        return res.redirect('/?url=' + encodeURIComponent(req.originalUrl));
    }

    var userIDToUse = req.App.user.userId;

    res.render('task-template', {
        scripts: ['/static/react_apps.js'],
        userId: userIDToUse,
        taskId: req.params.taskId,
        courseId: req.query.courseId,
        sectionId: req.query.sectionId,
        userType: req.App.user.role,
        isAdmin: req.App.user.role === _react_constants.ROLES.ENHANCED,
        visitorId: req.query.visitorId
    });
};