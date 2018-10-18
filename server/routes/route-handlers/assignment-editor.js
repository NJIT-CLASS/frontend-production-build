'use strict';

exports.get = function (req, res) {
    if (req.App.user === undefined) {
        return res.redirect('/?url=' + encodeURIComponent(req.originalUrl));
    }
    var courseId = null;

    res.render('./asa', {
        scripts: ['/static/react_apps.js'],
        userId: req.App.user.userId,
        courseId: req.params.courseId || '*',
        partialAssignmentId: req.query.partialAssignmentId,
        assignmentId: req.query.assignmentId,
        showHeader: false

    });
};