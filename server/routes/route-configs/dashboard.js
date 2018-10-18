'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/dashboard');


module.exports = {
    route: '/dashboard',
    title: 'Dashboard',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'dashboard',
    sidebar: true
};