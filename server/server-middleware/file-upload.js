'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var mv = require('mv');
var consts = require('../utils/constants');
var request = require('request');

function uploadFile(file, type, userId, postVars) {
    return new _promise2.default(function (resolve, reject) {
        var oldPath = file.path;
        var newPath = consts.UPLOAD_DIRECTORY_PATH + ('/' + file.filename);
        var path = file.path,
            destination = file.destination,
            usefulFileInfo = (0, _objectWithoutProperties3.default)(file, ['path', 'destination']);

        var fullPostVars = (0, _extends3.default)({}, postVars, {
            userId: userId,
            fileInfo: usefulFileInfo
        });
        request({
            uri: consts.API_URL + '/api/file/upload/' + type,
            method: 'POST',
            body: fullPostVars,
            json: true
        }, function (err, response, body) {
            if (response.statusCode == 200) {
                var newFileID = body.FileID;
                mv(oldPath, newPath, { mkdirp: true }, function (e) {
                    if (e) {
                        console.error(e);
                        resolve({
                            file: file,
                            error: e
                        });
                    } else {
                        resolve({
                            file: file,
                            FileID: newFileID
                        });
                    }
                });
            } else {
                resolve({
                    file: file,
                    error: err
                });
            }
        });
    });
}

function uploadFiles(fileArray, type, userId, postVars) {
    var successfulFiles = [];
    var unsuccessfulFiles = [];
    return new _promise2.default(function (resolve, reject) {

        var newFileArray = fileArray.map(function (file) {
            var path = file.path,
                destination = file.destination,
                usefulFileInfo = (0, _objectWithoutProperties3.default)(file, ['path', 'destination']);

            return usefulFileInfo;
        });
        var fullPostVars = (0, _extends3.default)({}, postVars, {
            userId: userId,
            files: newFileArray
        });
        request({
            uri: consts.API_URL + '/api/files/upload/' + type,
            method: 'POST',
            body: fullPostVars,
            json: true
        }, function (err, response, body) {
            body = typeof body == 'string' ? JSON.parse(body) : body;
            fileArray.forEach(function (file) {
                var oldPath = file.path;
                var newPath = consts.UPLOAD_DIRECTORY_PATH + ('/' + file.filename);
                // let newFileID = body.FileID;
                // console.log('Good response', newFileID);

                mv(oldPath, newPath, { mkdirp: true }, function (e) {
                    if (e) {
                        console.error(e);
                        unsuccessfulFiles.push({
                            file: file,
                            error: e
                        });
                    } else {
                        successfulFiles.push({
                            file: file
                            //FileID: newFileID
                        });
                    }
                });
            });

            resolve({ successfulFileMoves: successfulFiles,
                unsuccessfulFileMoves: unsuccessfulFiles,
                successfulFiles: body.SuccessfulFiles,
                unsuccessfulFiles: body.UnsuccessfulFiles
            });
        });
    });
}
module.exports = { uploadFiles: uploadFiles };