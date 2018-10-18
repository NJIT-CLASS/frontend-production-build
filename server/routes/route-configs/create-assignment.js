'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/create-assignment');


module.exports = {
    route: '/create-assignment',
    title: 'Create Assignment',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: false,
        role: _react_constants.ROLES.TEACHER,
        loggedOut: false
    },
    icon: 'file-text',
    sidebar: false
};