'use strict';

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var consts = require('../utils/constants');

var newSession = function () {
    return function (redisClient) {

        var sess = session({
            store: new RedisStore({
                client: redisClient,
                disableTTL: true
            }),
            secret: consts.REDIS_SECRET,
            resave: false,
            saveUninitialized: true
        });

        if (process.env.node === 'production') {
            sess.cookie.secure = true; // serve secure cookies
        }
        return sess;
    };
}();

module.exports = newSession;