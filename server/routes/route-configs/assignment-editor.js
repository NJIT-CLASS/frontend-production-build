'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/assignment-editor');


module.exports = {
    route: '/asa/:courseId', //will also need userId
    title: 'Assignment Editor',
    sidebarLink: '/asa/*',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: false,
        role: _react_constants.ROLES.TEACHER,
        loggedOut: false
    },
    icon: 'edit',
    sidebar: true
};