'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/masquerade');


module.exports = {
    route: '/masquerade',
    title: 'Masquerade',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: false,
        students: false,
        role: _react_constants.ROLES.ADMIN,
        loggedOut: false
    },
    icon: '',
    sidebar: false
};