'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/reallocation.js');


module.exports = {
    route: '/reallocation',
    title: 'Reallocations',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: false,
        role: _react_constants.ROLES.ADMIN,
        loggedOut: false
    },
    icon: 'exchange',
    sidebar: false
};