'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/testing-ground');


module.exports = {
    route: '/testing',
    title: 'Testing Ground',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: false,
        students: false,
        role: _react_constants.ROLES.ENHANCED,
        loggedOut: false
    },
    icon: 'cog',
    sidebar: false
};