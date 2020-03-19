'use strict';

var utils = require('../utils/writer.js');
var AccessToken = require('../service/AccessTokenService');

module.exports.usersAccessGET = function usersAccessGET (req, res, next, username) {
  AccessToken.usersAccessGET(username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
