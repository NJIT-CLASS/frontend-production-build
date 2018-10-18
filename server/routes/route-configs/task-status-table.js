'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/task-status-table');


module.exports = {
    route: '/assignment-record/:assignmentId',
    title: 'Assignment Status',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'bar-chart',
    sidebar: false
};