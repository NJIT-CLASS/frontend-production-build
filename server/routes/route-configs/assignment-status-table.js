'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/assignment-status-table');


module.exports = {
    route: '/assignment-status',
    title: 'Assignment Status Table',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'align-left',
    sidebar: true
};