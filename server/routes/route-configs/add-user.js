'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/add-user');


module.exports = {
    route: '/add-user',
    title: 'Add User',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: false,
        roles: _react_constants.ROLES.ADMIN,
        loggedOut: false

    },
    icon: 'user-plus',
    sidebar: false
};