'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/database-maintenance');


module.exports = {
    route: '/database-manage',
    title: 'Archive/Delete',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: false,
        students: false,
        role: _react_constants.ROLES.ADMIN,
        loggedOut: false
    },
    icon: 'archive',
    sidebar: true
};