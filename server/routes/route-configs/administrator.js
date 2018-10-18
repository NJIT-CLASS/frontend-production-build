'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/administrator');


module.exports = {
    route: '/administrator',
    title: 'Administrator',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: false,
        students: false,
        roles: _react_constants.ROLES.ADMIN,
        loggedOut: false
    },
    icon: 'cogs',
    sidebar: true
};