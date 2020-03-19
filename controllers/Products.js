'use strict';

var utils = require('../utils/writer.js');
var Products = require('../service/ProductsService');

module.exports.productsIdDELETE = function productsIdDELETE (req, res, next, id) {
  Products.productsIdDELETE(req,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) { 
      var code=401;
      if(response=="Id not found"){
        code=404;
      }
      utils.writeJson(res, response,code);
    });
};

module.exports.productsIdGET = function productsIdGET (req, res, next, id) {
  Products.productsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response,404);
    });
};

module.exports.productsIdPUT = function productsIdPUT (req, res, next, body, id) {
  Products.productsIdPUT(req,body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var code=401;
      if(response=="Id not found"){
        code=404;
      }
      utils.writeJson(res, response,code);
    });
};
