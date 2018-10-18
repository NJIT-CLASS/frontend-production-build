'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/settings');


module.exports = {
    route: '/settings',
    title: 'Settings',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'cogs',
    sidebar: false
};