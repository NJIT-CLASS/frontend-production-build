'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/assignment-final-grades');


module.exports = {
    route: '/assignment-grade-report/all/:assignmentId',
    title: 'Grade Report',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: 'address-book',
    sidebar: true
};