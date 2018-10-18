'use strict';

exports.get = function (req, res) {
    res.render('all-users', {
        scripts: ['/static/react_apps.js'],
        userId: req.App.user.userId
    });
};