'use strict';

/**
 * Created by Sohail and Immanuel on 6/6/2017.
 */
var handler = require('../route-handlers/badges');

module.exports = {
    route: '/badges',
    title: 'Badges',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        loggedOut: false
    },
    icon: 'trophy',
    sidebar: true
};