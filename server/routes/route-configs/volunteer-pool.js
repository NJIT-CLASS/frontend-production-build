'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/volunteer-pool');


module.exports = {
    route: '/volunteer-pool',
    title: 'Volunteer Pool',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'hand-paper',
    sidebar: false
};