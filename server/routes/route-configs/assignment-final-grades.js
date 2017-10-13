'use strict';

var handler = require('../route-handlers/assignment-final-grades');

module.exports = {
    route: '/assignment-grade-report/all/:assignmentId',
    title: 'Assignment Final Grades',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: false,
        loggedOut: false
    },
    icon: '',
    sidebar: false
};