'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/assign-to-section');


module.exports = {
    route: '/assign-to-section/:assignmentId',
    title: 'Assign to Section',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: false,
        role: _react_constants.ROLES.TEACHER,
        loggedOut: false
    },
    icon: 'fa-pencil',
    sidebar: false
};