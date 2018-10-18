'use strict';

var _react_constants = require('../../utils/react_constants');

var async = require('async');


exports.get = function (req, res) {
    if (req.App.user === undefined) {
        return res.redirect('/?url=' + encodeURIComponent(req.originalUrl));
    }
    res.render('course-page', {
        scripts: ['/static/react_apps.js'],
        userId: req.App.user.userId,
        courseId: req.params.Id,
        userType: req.App.user.role,
        sessionToken: req.session.token
    });
};