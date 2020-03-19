'use strict';

var utils = require('../utils/writer.js');
var Inventory = require('../service/InventoryService');

module.exports.productsGET = function productsGET (req, res, next, limit) {
  Inventory.productsGET(limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsPOST = function productsPOST (req, res, next, body) {
  Inventory.productsPOST(req,body)
    .then(function (response) {
      utils.writeJson(res, response,201);
    })
    .catch(function (response) {
      utils.writeJson(res, response,401);
    });
};
