'use strict';

var consts = require('../../utils/constants');
exports.get = function (req, res) {
  res.render('sections', {
    scripts: ['/static/react_apps.js'],
    userId: req.App.user.userId,
    apiUrl: consts.API_URL
  });
};