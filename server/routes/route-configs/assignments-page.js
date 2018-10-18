'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/assignments-page');


module.exports = {
    route: '/assignments_page',
    title: 'Assignments Status',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: false,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'paper',
    sidebar: true
};