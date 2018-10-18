'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/about');


module.exports = {
    route: '/about',
    title: 'About Participatory Learning',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.GUEST,
        loggedOut: true
    },
    icon: 'files-o',
    sidebar: true
};