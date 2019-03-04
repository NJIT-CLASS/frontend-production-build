'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/course-section-management');


module.exports = {
    route: '/course-section-management',
    title: 'Course Management',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: false,
        role: _react_constants.ROLES.TEACHER,
        loggedOut: false
    },
    icon: 'sitemap',
    sidebar: true
};