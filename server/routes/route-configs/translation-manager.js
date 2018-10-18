'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/translation-manager');


module.exports = {
    route: '/translation-manager',
    title: 'Translation Manager',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: false,
        students: false,
        role: _react_constants.ROLES.ADMIN,
        loggedOut: false
    },
    icon: 'globe',
    sidebar: true
};