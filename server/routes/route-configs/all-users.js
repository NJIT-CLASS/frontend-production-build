'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/all-users');


module.exports = {
    route: '/all-users',
    title: 'All Users',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: false,
        students: false,
        role: _react_constants.ROLES.ADMIN,
        loggedOut: false
    },
    icon: 'users',
    sidebar: true
};