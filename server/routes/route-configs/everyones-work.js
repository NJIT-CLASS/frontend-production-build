'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/everyones-work');


module.exports = {
    route: '/everyones-work/:assignmentId?',
    title: 'Everyone\'s Work',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'tasks',
    sidebar: true
};