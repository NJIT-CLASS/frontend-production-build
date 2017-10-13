'use strict';

var _react_constants = require('../../utils/react_constants');

// exports.get = (req, res) => {
//     if(req.App.user === undefined){
//         return res.redirect('/');
//     }
//     res.render('about');
// };

exports.get = function (req, res) {
    if (req.App.user === undefined) {
        return res.redirect('/');
    }
    res.render('about_react', {
        scripts: ['/static/react_apps.js'],
        apiUrl: _react_constants.API_URL
    });
};