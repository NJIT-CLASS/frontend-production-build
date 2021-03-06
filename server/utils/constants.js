'use strict';

var path = require('path');

var fallbackSettings;

try {
    fallbackSettings = require('../../fallback_settings');
} catch (e) {}

//Frontend Server Settings (MODIFY frontend_setting.js instead of here)
exports.FRONTEND_PORT = process.env.CLASS_PORT || fallbackSettings.FRONTEND_PORT;
exports.REDIS_SECRET = process.env.CLASS_REDIS_SECRET || fallbackSettings.REDIS_SECRET;
exports.REDIS_HOST = process.env.CLASS_REDIS_HOST || fallbackSettings.REDIS_HOST;
exports.REDIS_PORT = process.env.CLASS_REDIS_PORT || fallbackSettings.REDIS_PORT;
exports.REDIS_AUTH = process.env.CLASS_REDIS_AUTH || fallbackSettings.REDIS_AUTH;
exports.API_URL = process.env.API_URL || fallbackSettings.API_URL;
exports.PRIVATE_KEY = process.env.PRIVATE_KEY || fallbackSettings.PRIVATE_KEY;
exports.CERT = process.env.CERT || fallbackSettings.CERT;
exports.ROOT_DIRECTORY_PATH = path.resolve(__dirname, '../');
exports.FILE_SIZE = 52428800;
exports.MAX_NUM_FILES = 6;
exports.UPLOAD_DIRECTORY_PATH = './files/';