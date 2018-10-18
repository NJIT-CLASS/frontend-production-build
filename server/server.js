'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _fileUpload = require('./server-middleware/file-upload');

var _react_constants = require('./utils/react_constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');
var https = require('https');
var forceSSL = require('express-force-ssl');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cryptoJS = require('crypto-js');
var request = require('request');
var redis = require('redis');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var mv = require('mv');
var session = require('./server-middleware/session');
var translation = require('./server-middleware/translation');
var templates = require('./server-middleware/templates');
var apiMethodInit = require('./server-middleware/api').apiMethodsInit;
var languageService = require('./server-middleware/language-service');
var routes = require('./routes/routes');
var consts = require('./utils/constants');
var react_consts = require('./utils/react_constants');

var loginGetRoute = require('./routes/route-handlers/login').get;
var loginPostRoute = require('./routes/route-handlers/login').post;
var loggedOutRoutes = routes.filter(function (route) {
    return route.access.loggedOut;
});
var loggedInRoutes = routes.filter(function (route) {
    return !route.access.loggedOut;
});

var app = express();
var redisClient = redis.createClient({
    host: consts.REDIS_HOST,
    port: consts.REDIS_PORT,
    password: consts.REDIS_AUTH
});

var multer = require('multer'); //TODO: we may need to limit the file upload size
var storage = multer({
    dest: './tempFiles/',
    limits: { //Max 3 files and total of 50MB
        fileSize: consts.FILE_SIZE,
        files: consts.MAX_NUM_FILES
    }
});
var allowedRouteMethods = ['get', 'post', 'put', 'delete'];
//Setup static files
app.use('/static', express.static(__dirname + '/static'));
app.use('/service-worker.js', express.static(__dirname + '/service-worker.js'));
//Setup request parsing
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

//Setup Redis session
app.use(session(redisClient));

//Optionally redirect http to https
if (process.env.NODE_ENV === 'production') {
    app.use(forceSSL);
}

////Begin Middleware

//Setup API methods
app.use(function (req, res, next) {
    req.App = {};
    req.App.api = apiMethodInit(req, res, next);

    next();
});

// APIs to access backend API routes through frontend server
app.get('/api/generalCall', function (req, res) {
    var queryStrings = req.query;
    var endpoint = '' + req.query.endpoint;
    delete queryStrings.endpoint;
    req.App.api.get(endpoint, queryStrings, function (err, statusCode, body) {
        res.status(statusCode).json(body);
        res.end();
    });
});
app.post('/api/generalCall', function (req, res) {
    var postVars = req.body;
    var endpoint = '' + req.body.endpoint;
    delete postVars.endpoint;
    req.App.api.post(endpoint, postVars, function (err, statusCode, body) {
        res.status(statusCode).json(body);
        res.end();
    });
});

app.delete('/api/generalCall', function (req, res) {
    var postVars = req.body;
    var endpoint = '' + req.body.endpoint;
    delete postVars.endpoint;
    req.App.api.delete(endpoint, postVars, function (err, statusCode, body) {
        res.status(statusCode).json(body);
        res.end();
    });
});

app.put('/api/generalCall', function (req, res) {
    var postVars = req.body;
    var endpoint = '' + req.body.endpoint;
    delete postVars.endpoint;
    req.App.api.put(endpoint, postVars, function (err, statusCode, body) {
        res.status(statusCode).json(body);
        res.end();
    });
});

//Checks that Redis is working properly
app.use(function (req, res, next) {
    if (req.session === undefined) {
        //Could not connect to Redis so return error page
        console.log('Couldn\'t find session. Probably an issue with Redis.');
        return res.sendFile(__dirname + '/views/not_found.html');
    }
    next();
});

// set the language cookie if it has a lang query param
app.use(function (req, res, next) {
    // language options
    var languages = react_consts.LANGUAGES;
    // default language
    res.locale = 'en';

    if (req.headers['accept-language']) {
        //set language to user's browser configuration
        var locales = languages.map(function (lang) {
            return lang.locale;
        });
        var browserLangs = req.headers['accept-language'].match(/[a-z]{2}/g);
        for (var idx = 0; idx < browserLangs.length; idx += 1) {
            if (browserLangs[idx] in locales) {
                res.locale = browserLangs[idx];
            }
        }

        locales = null;
        browserLangs = null;
    }

    if ('lang' in req.query) {
        req.session.lang = req.query.lang;
        res.locale = req.query.lang;
    }

    if ('lang' in req.session) {
        res.locale = req.session.lang;
    }

    req.App.langOptions = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(languages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var lang = _step.value;

            if (lang.locale === res.locale) {
                req.App.lang = lang.language;
            } else {
                req.App.langOptions.push(lang);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    next();
});

var __;

//Sets up the Handlebars template engine for Express
app.use(function (req, res, next) {
    translation(redisClient).setupTranslations(res.locale, function (translateFunc) {
        __ = translateFunc;

        app.set('views', __dirname + '/views/');
        app.engine('.html', templates.setup(__).engine);
        app.set('view engine', '.html');

        next();
    });
});

//Stores the user session Id into req.App.user object
app.use(function (req, res, next) {
    if ('userId' in req.session) {
        req.App.user = {};
        req.App.user.userId = req.session.userId;
    }
    next();
});
//Login page
// app.get('/',loginGetRoute);
// app.post('/',loginPostRoute);


//Prepares render function to support options specified in route configs
// Setup routes 

app.use(function (req, res, next) {
    var render = res.render;

    res.render = function (template, options, cb) {
        options = options ? options : {};

        options.template = template;
        options.user = req.App.user;

        if (!('showHeader' in options)) {
            options.showHeader = true;
        }

        options.language = req.App.lang;
        options.languageOptions = req.App.langOptions;

        if (options.loggedOut) {
            options.layout = 'logged_out';

            return render.call(this, template, options, cb);
        }
        if (req.App.user && !(0, _react_constants.canRoleAccess)(req.App.user.role, options.role)) {
            if (req.App.user.admin && options.admin || req.session.masqueraderId != null) {} else {
                return res.sendStatus(404);
            }
        }
        options.showMasqueradingOption = (0, _react_constants.canRoleAccess)(req.App.user.role, _react_constants.ROLES.ADMIN) || req.App.user.admin;

        var sidebarNavItems = [];

        for (var route in routes) {
            var currentRoute = _.clone(routes[route]);
            if (!currentRoute.sidebar) {
                continue;
            }

            if (currentRoute.route === options.route) {
                currentRoute.selected = true;
            } else {
                currentRoute.selected = false;
            }

            currentRoute.title = __(currentRoute.title);

            if ((0, _react_constants.canRoleAccess)(req.App.user.role, currentRoute.access.role)) {
                sidebarNavItems.push(currentRoute);
                continue;
            }

            if (req.App.user.type === 'student') {
                if (currentRoute.access.students) {
                    sidebarNavItems.push(currentRoute);
                } else {
                    continue;
                }
            } else if (req.App.user.type == 'teacher' && req.App.user.admin == 0) {
                if (currentRoute.access.instructors) {
                    sidebarNavItems.push(currentRoute);
                } else {
                    continue;
                }
            } else {
                sidebarNavItems.push(currentRoute);
            }
        }

        options.sidebarNavItems = sidebarNavItems;

        // only allow logged out users access to pages that are meant for logged out users
        if (!req.App.user || !req.App.user.userId) {
            return res.sendStatus(404);
        }

        render.call(this, template, options, cb);
    };

    next();
});

//Setup up logged out routes

var _loop = function _loop(route) {
    for (var method in route.routeHandler) {
        // if the method is allowed then bind the route to it
        if (allowedRouteMethods.indexOf(method) !== -1) {
            app[method](route.route, function () {
                return function (req, res, next) {
                    try {
                        var previousRender = res.render;
                        res.render = function () {
                            return function (template, options, cb) {
                                options = options ? options : {};
                                options.loggedOut = true; //route.access.loggedOut;
                                options.role = route.access.role;
                                options.route = route.route;
                                options.language = req.App.lang;
                                options.languageOptions = req.App.langOptions;
                                // if the render doesn't set the title then set it by the route
                                if (!('title' in options)) {
                                    options.title = route.title + ' | CLASS Learning System';
                                }

                                // set the page header to be the route title if the pageHeader is not set
                                if (!('pageHeader' in options)) {
                                    options.pageHeader = route.title;
                                }

                                // pass masquerading info to template


                                previousRender.call(this, template, options, cb);
                            };
                        }();
                        next();
                    } catch (error) {
                        next(error);
                    }
                };
            }(), route.routeHandler[method]);
        }
    }
};

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = (0, _getIterator3.default)(loggedOutRoutes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var route = _step2.value;

        _loop(route);
    }
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

app.use(function (req, res, next) {

    if (!'userId' in req.session) return res.redirect('/?url=' + encodeURIComponent(req.originalUrl));

    if (!'token' in req.session) return res.redirect('/?url=' + encodeURIComponent(req.originalUrl));

    next();
});

//Gets user profile details from backend(also checks for issues with connecting to backend)
app.use(function (req, res, next) {
    if (req.App.user && req.App.user.userId) {

        return req.App.api.get('/generalUser/' + req.App.user.userId, function (err, statusCode, body) {

            if (err || statusCode === 500) {
                console.log('Got error or 500 code from backend for user: ', req.App.user.userId);
                delete req.session.userId;
                delete req.session.token;
                delete req.session.refreshToken;
                console.log('Had trouble fetching user profile. Check the backend server or API_URL');
                res.redirect('/');
                return;
            }

            if (body === undefined || body.User === undefined) {
                console.log('Got undefined body from backend for user: ', req.App.user.userId);

                delete req.session.userId;
                delete req.session.token;
                delete req.session.refreshToken;
                res.redirect('/');
                return;
            }
            try {
                var user = body.User; // JV - grabbed user's information
                req.App.user.email = user.UserLogin.Email;
                req.App.user.firstName = user.FirstName;
                req.App.user.lastName = user.LastName;
                req.App.user.role = user.Role;
                req.App.user.type = user.Instructor ? 'teacher' : 'student';
                req.App.user.admin = user.Admin;
                req.App.user.info = user.UserContact;
                next();
            } catch (err) {
                console.log('Caught exception in getting details for user: ', req.App.user.userId);

                delete req.session.userId;
                delete req.session.token;
                delete req.session.refreshToken;
                res.redirect('/');
                return;
            }
        });
    } else {
        console.log('Found No UserID in session (Redis issue)');
        delete req.session.userId;
        delete req.session.token;
        delete req.session.refreshToken;
        console.log('No user profile. Check the backend server or API_URL');
        res.redirect('/');
        return;
    }
});

//Translation APIs
app.get('/api/getTranslatedString', function (req, res) {
    var locale = 'en';

    if ('lang' in req.query) {
        locale = req.query.lang;
    }

    if ('lang' in req.session) {
        locale = req.session.lang;
    }

    translation(redisClient).setupTranslations(locale, function (translateFunc) {
        var translated = translateFunc(req.query.string);
        res.json({
            lang: translated
        });
        res.end();
    });
});

app.post('/api/getTranslatedString', function (req, res) {
    var locale = 'en';

    if ('lang' in req.query) {
        locale = req.query.lang;
    }

    if ('lang' in req.session) {
        locale = req.session.lang;
    }

    translation(redisClient).setupTranslations(locale, function (translateFunc) {
        var language = req.body.string;
        (0, _keys2.default)(language).map(function (key) {
            language[key] = translateFunc(language[key]);
        });

        res.json(language);
        res.end();
    });
});

app.get('/api/translations', function (req, res) {
    languageService(redisClient).getAllStringsInLanguage(req.query.lang ? req.query.lang : 'en', function (err, results) {
        res.json(results);

        res.end();
    });
});

app.post('/api/translations', function (req, res) {
    if (!(language in req.body)) {
        res.status(400).end();
    }

    var language = req.body.language;

    for (var str in req.body.strs) {
        languageService(redisClient).addTranslation(language, str, req.body.strs[str]);
    }

    res.status(200).end();
});

//Admin Change API
app.post('/api/change-admin-status', function (req, res) {
    var userId = req.body.userId;
    var makeAdmin = req.body.makeAdmin;

    if (!makeAdmin) {
        console.log('not make admin');
        return res.status(500).end();
    }

    req.App.api.put('/makeUserAdmin/', {
        UserID: userId,
        token: req.session.token
    }, function (err, statusCode, body) {
        res.status(statusCode).end();
    });
});

//API for file uploading
app.post('/api/file/upload/:type?', storage.array('files'), function (req, res) {
    var postVars = req.body;
    var endpoint = '' + req.body.endpoint;
    postVars.token = req.session.token;

    //maybe check for authorization before continuing
    var type = req.params.type || '';
    delete postVars.endpoint;
    var listOfErrors = [];
    var uploadStatus = {
        successfulFiles: [],
        failedFiles: []
    };

    (0, _fileUpload.uploadFiles)(req.files, type, req.App.user.userId, postVars).then(function (resultsObject) {
        console.log('File Upload API response', resultsObject);
        uploadStatus.successfulFiles = resultsObject.successfulFiles;
        uploadStatus.failedFiles = resultsObject.unsuccessfulFiles;
        if (uploadStatus.failedFiles.length == 0) {
            return res.status(200).json(uploadStatus);
        } else {
            return res.status(400).json(uploadStatus);
        }
    });
});

//API for file downloading
app.get('/api/file/download/:fileId', function (req, res) {
    var file_id = req.body.fileId || req.params.fileId;

    if (file_id == null) {
        return res.status(400).end();
    }
    var queryStrings = {
        token: req.session.token
    };

    request({
        uri: consts.API_URL + '/api/file/download/' + file_id,
        qs: queryStrings,
        method: 'GET',
        json: true
    }, function (err, response, body) {
        var file_ref = body;

        if (!file_ref) {
            return res.status(400).end();
        }
        file_ref = JSON.parse(file_ref.Info);
        console.log(file_ref);
        var contDispFirstHalf = file_ref.mimetype.match('image') ? 'inline' : 'attachment';
        var contDispSecondHalf = file_ref.originalname;
        var content_headers = {
            'Content-Type': file_ref.mimetype,
            'Content-Length': file_ref.size,
            'Content-Disposition': contDispFirstHalf + ';filename=' + contDispSecondHalf
        };
        res.writeHead(200, content_headers);
        var readStream = fs.createReadStream(consts.UPLOAD_DIRECTORY_PATH + '/' + file_ref.filename);
        console.log('path', consts.UPLOAD_DIRECTORY_PATH + '/' + file_ref.filename);
        readStream.on('open', function () {
            readStream.pipe(res);
        });
        readStream.on('error', function (err) {
            console.error(err);
            res.status(400).end();
        });
    });
});

//API for file deleting
app.delete('/api/file/delete/', function (req, res) {
    //probably verify authorization and owner first
    var file_id = req.body.fileId;
    var postVars = req.body;
    postVars.userId = req.App.user.userId;
    postVars.token = req.session.token;

    if (!file_id) {
        return res.status(400).end();
    }

    request({
        uri: consts.API_URL + '/api/file/delete/' + file_id,
        method: 'DELETE',
        json: true,
        body: postVars
    }, function (err, response, body) {
        if (response.statusCode === 400 || body === undefined) {
            console.error(err);
            return res.status(400).end();
        }
        var file_ref = typeof body.Info == 'string' ? JSON.parse(body.Info) : body.Info;
        var filePath = consts.UPLOAD_DIRECTORY_PATH + '/' + file_ref.filename;
        fs.unlink(filePath, function (err) {
            if (err) {
                console.error(err);
                return res.status(400).end();
            }
            return res.status(200).end();
        });
    });
});

var _loop2 = function _loop2(route) {
    for (var method in route.routeHandler) {
        // if the method is allowed then bind the route to it
        if (allowedRouteMethods.indexOf(method) !== -1) {
            app[method](route.route, function () {
                return function (req, res, next) {
                    try {
                        var previousRender = res.render;
                        res.render = function () {
                            return function (template, options, cb) {
                                options = options ? options : {};
                                options.loggedOut = false; //route.access.loggedOut;
                                options.role = route.access.role;
                                options.route = route.route;
                                options.student = route.access.students;
                                options.teacher = route.access.instructors;
                                options.admin = route.access.admins;
                                // if the render doesn't set the title then set it by the route
                                if (!('title' in options)) {
                                    options.title = route.title + ' | CLASS Learning System';
                                }

                                // set the page header to be the route title if the pageHeader is not set
                                if (!('pageHeader' in options)) {
                                    options.pageHeader = route.title;
                                }

                                // pass masquerading info to template
                                if (req.session.masqueraderId && options.route !== '/') {
                                    options.masquerading = true;
                                    options.userEmail = req.App.user.email;
                                }

                                previousRender.call(this, template, options, cb);
                            };
                        }();
                        next();
                    } catch (error) {
                        next(error);
                    }
                };
            }(), route.routeHandler[method]);
        }
    }
};

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
    for (var _iterator3 = (0, _getIterator3.default)(loggedInRoutes), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var route = _step3.value;

        _loop2(route);
    }

    //General Error handler
} catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
        }
    } finally {
        if (_didIteratorError3) {
            throw _iteratorError3;
        }
    }
}

app.use(function (err, req, res, next) {
    console.error(err.stack);
    if (!res.headersSent) {
        delete req.session.userId;
        delete req.session.token;
        delete req.session.refreshToken;
        res.status(500).redirect('/');
    }
});

//Activate https server only if in production
if (process.env.NODE_ENV === 'production') {
    var key = fs.readFileSync(consts.PRIVATE_KEY);
    var cert = fs.readFileSync(consts.CERT);
    var options = {
        key: key,
        cert: cert
    };
    /*var http = express.createServer();
    
    http.get('*', function(req, res) {  
        res.redirect('https://' + req.headers.host + req.url);
    
    });
    
    http.listen(8080);*/
    https.createServer(options, app).listen(consts.FRONTEND_PORT);
} else {
    http.createServer(app).listen(consts.FRONTEND_PORT);
}

console.log('Server running at http://localhost:' + consts.FRONTEND_PORT);