'use strict';

var _react_constants = require('../../utils/react_constants');

exports.get = function (req, res) {
    if (req.App.user === undefined) {
        res.redirect('/');
    }
    res.render('leaderboard', {
        scripts: ['/static/react_apps.js'],
        userId: req.App.user.userId,
        apiUrl: _react_constants.API_URL
    });
}; /**
    * Created by Sohail and Immanuel on 7/7/2017.
    */