'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/course-page');


module.exports = {
    route: '/course_page/:Id',
    title: 'Course Page',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: '',
    sidebar: false
};