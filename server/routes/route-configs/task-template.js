'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/task-template');


module.exports = {
    route: '/task/:taskId',
    title: 'Task Page',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'fa-pencil',
    sidebar: false
};