'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/my-account');


module.exports = {
    route: '/my-account',
    title: 'My Account',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.GUEST,
        loggedOut: false
    },
    icon: 'cog',
    sidebar: false
};