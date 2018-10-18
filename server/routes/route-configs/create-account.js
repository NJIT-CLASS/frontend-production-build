'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/create-account');


module.exports = {
    route: '/create-account/:id',
    title: 'Create Account',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: true
    },
    icon: '',
    sidebar: false
};