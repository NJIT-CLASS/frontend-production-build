'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/stop-masquerading');


module.exports = {
    route: '/stop-masquerading',
    title: 'Stop Masquerading',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.PARTICIPANT,
        loggedOut: false
    },
    icon: '',
    sidebar: false
};