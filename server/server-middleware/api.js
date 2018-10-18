'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var consts = require('../utils/constants');
var apiUrl = function apiUrl(endpoint) {
    return consts.API_URL + '/api' + endpoint;
};

var checkAndRefreshToken = function checkAndRefreshToken(req) {
    return new _promise2.default(function (resolve, reject) {});
};

var apiMethodInit = function apiMethodInit(req, res, next) {
    var apiMethods = {};
    apiMethods.get = function (endpoint, queryParameters, cb) {
        if (arguments.length === 2) {
            var cb = queryParameters;
            queryParameters = {};
            //queryParameters.token = req.session.token;
        }
        if (req.session != null) {
            queryParameters.UserID = req.session.userId;
        }
        // if(!queryParameters.token){
        //     queryParameters.token = req.session.token;
        // }

        var options = {
            method: 'GET',
            uri: apiUrl(endpoint),
            qs: queryParameters,
            headers: {
                'x-access-token': req.session.token
            },
            json: true
        };

        request(options, function (err, response, body) {
            var responseCode = response === undefined ? 500 : response.statusCode;
            if (response !== undefined) {
                if (response.statusCode === 409) {
                    //bad token, try to refresh
                    var refreshOptions = {
                        method: 'POST',
                        uri: apiUrl('/refreshToken'),
                        headers: {
                            'x-access-token': req.session.token
                        },
                        body: {
                            refreshToken: req.session.refreshToken,
                            UserID: req.session.userId
                        },
                        json: true
                    };
                    delete req.session.token;
                    request(refreshOptions, function (refreshErr, refreshResponse, refreshBody) {
                        if (refreshResponse.statusCode === 410 || refreshResponse.statusCode === 401) {
                            delete req.session.userId;
                            delete req.session.refreshToken;
                            return res.status(410).redirect('/');
                        }
                        req.session.token = refreshBody.Token;
                        queryParameters.token = req.session.token;
                        apiMethods.get(endpoint, queryParameters, cb);
                        return;
                    });
                } else {
                    return cb(err, responseCode, body);
                }
            } else {
                return cb(err, responseCode, body);
            }
        });
    };

    apiMethods.post = function (endpoint, body, cb) {
        if (arguments.length === 2) {
            var cb = body;
            body = {};
            // body.token = req.session.token;
        }
        if (req.session != null) {
            body.UserID = req.session.userId;
        }
        // if(!body.token){
        //     body.token = req.session.token;
        // }
        var options = {
            method: 'POST',
            uri: apiUrl(endpoint),
            headers: {
                'x-access-token': req.session.token
            },
            json: true,
            body: body
        };

        request(options, function (err, response, body) {
            var responseCode = response === undefined ? 500 : response.statusCode;
            if (response !== undefined) {
                if (response.statusCode === 409) {
                    //bad token, try to refresh
                    var refreshOptions = {
                        method: 'POST',
                        uri: apiUrl('/refreshToken'),
                        body: {
                            refreshToken: req.session.refreshToken,
                            token: req.session.token,
                            UserID: req.session.userId
                        },
                        json: true
                    };
                    delete req.session.token;

                    request(refreshOptions, function (refreshErr, refreshResponse, refreshBody) {
                        if (refreshResponse.statusCode === 410) {
                            delete req.session.userId;
                            delete req.session.token;
                            delete req.session.refreshToken;
                            return res.status(410).redirect('/');
                        }
                        req.session.token = refreshBody.Token;
                        body.token = req.session.token;
                        apiMethods.post(endpoint, body, cb);
                        return;
                    });
                } else {
                    return cb(err, responseCode, body);
                }
            } else {
                return cb(err, responseCode, body);
            }
        });
    };

    apiMethods.put = function (endpoint, body, cb) {
        if (arguments.length === 2) {
            var cb = body;
            body = {};
            //body.token = req.session.token;
        }

        // if(!body.token){
        //     body.token = req.session.token;
        // }
        if (req.session != null) {
            body.UserID = req.session.userId;
        }
        var options = {
            method: 'PUT',
            uri: apiUrl(endpoint),
            json: true,
            headers: {
                'x-access-token': req.session.token
            },
            body: body
        };

        request(options, function (err, response, body) {
            var responseCode = response === undefined ? 500 : response.statusCode;
            if (response !== undefined) {

                if (response.statusCode === 409) {
                    //bad token, try to refresh
                    var refreshOptions = {
                        method: 'POST',
                        uri: apiUrl('/refreshToken'),
                        body: {
                            refreshToken: req.session.refreshToken,
                            token: req.session.token,
                            UserID: req.session.userId
                        },
                        json: true
                    };
                    delete req.session.token;

                    request(refreshOptions, function (refreshErr, refreshResponse, refreshBody) {
                        if (refreshResponse.statusCode === 410) {
                            delete req.session.userId;
                            delete req.session.token;
                            delete req.session.refreshToken;
                            return res.status(410).redirect('/');
                        }
                        req.session.token = refreshBody.Token;
                        body.token = req.session.token;
                        apiMethods.post(endpoint, body, cb);
                        return;
                    });
                } else {
                    return cb(err, responseCode, body);
                }
            } else {
                return cb(err, responseCode, body);
            }
        });
    };

    apiMethods.delete = function (endpoint, body, cb) {
        if (arguments.length === 2) {
            var cb = body;
            body = {};
            //body.token = req.session.token;
        }
        // if(!body.token){
        //     body.token = req.session.token;
        // }
        if (req.session != null) {
            body.UserID = req.session.userId;
        }
        var options = {
            method: 'DELETE',
            uri: apiUrl(endpoint),
            headers: {
                'x-access-token': req.session.token
            },
            json: true,
            body: body
        };

        request(options, function (err, response, body) {
            var responseCode = response === undefined ? 500 : response.statusCode;

            if (response !== undefined) {
                if (response.statusCode === 409) {
                    //bad token, try to refresh
                    var refreshOptions = {
                        method: 'POST',
                        uri: apiUrl('/refreshToken'),
                        body: {
                            refreshToken: req.session.refreshToken,
                            token: req.session.token,
                            UserID: req.session.userId
                        },
                        json: true
                    };
                    delete req.session.token;

                    request(refreshOptions, function (refreshErr, refreshResponse, refreshBody) {
                        if (refreshResponse.statusCode === 410) {
                            delete req.session.userId;
                            delete req.session.token;
                            delete req.session.refreshToken;
                            return res.status(410).redirect('/');
                        }
                        req.session.token = refreshBody.Token;
                        body.token = req.session.token;
                        apiMethods.post(endpoint, body, cb);
                        return;
                    });
                } else {
                    return cb(err, responseCode, body);
                }
            } else {
                return cb(err, responseCode, body);
            }
        });
    };

    return apiMethods;
};

exports.apiMethodsInit = apiMethodInit;