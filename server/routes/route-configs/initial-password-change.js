'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/initial-password-change');

module.exports = {
    route: '/initial-password-change',
    title: 'Login',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.GUEST,
        loggedOut: false
    },
    sidebar: false
};