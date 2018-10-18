'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/user-management');


module.exports = {
    route: '/user-management',
    title: 'User Management',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: false,
        students: false,
        role: _react_constants.ROLES.ADMIN,
        loggedOut: false
    },
    icon: 'cogs',
    sidebar: true
};