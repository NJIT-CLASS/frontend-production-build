'use strict';

// exports.get = (req, res) => {
//     if(req.App.user === undefined){
//         return res.redirect('/');
//     }
//     res.render('about');
// };

exports.get = function (req, res) {
    //if(req.App.user === undefined){
    //    return res.redirect('/');
    // }
    res.render('about_react', {
        scripts: ['/static/react_apps.js']
    });
};