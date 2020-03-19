'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.usersGET = function usersGET (req, res, next, username) {
  Users.usersGET(req,username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var code=401
      if("Invalid Username"){
        code=400;
      }
      utils.writeJson(res, response,code);
    });
};

module.exports.usersPOST = function usersPOST (req, res, next, body) {
  Users.usersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
