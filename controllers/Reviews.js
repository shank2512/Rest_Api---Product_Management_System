'use strict';

var utils = require('../utils/writer.js');
var Reviews = require('../service/ReviewsService');

module.exports.addReview = function addReview (req, res, next, body, id) {
  Reviews.addReview(req,body, id)
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

module.exports.productsIdReviewsGET = function productsIdReviewsGET (req, res, next, id) {
  Reviews.productsIdReviewsGET(req,id)
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

module.exports.productsIdpReviewsIdrDELETE = function productsIdpReviewsIdrDELETE (req, res, next, idp, idr) {
  Reviews.productsIdpReviewsIdrDELETE(req,idp, idr)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var code=401;
      if(response=="Product Id not found"|| response=="Review id not found"){
        code=404;
      }
      utils.writeJson(res, response,code);
    });
};

module.exports.productsIdpReviewsIdrGET = function productsIdpReviewsIdrGET (req, res, next, idp, idr) {
  Reviews.productsIdpReviewsIdrGET(req,idp, idr)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var code=401;
      if(response=="Product Id not found"|| response=="Review id not found"){
        code=404;
      }
      utils.writeJson(res, response,code);
    });
};

module.exports.productsIdpReviewsIdrPUT = function productsIdpReviewsIdrPUT (req, res, next, body, idp, idr) {
  Reviews.productsIdpReviewsIdrPUT(req,body, idp, idr)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var code=401;
      if(response=="Product Id not found"|| response=="Review id not found"){
        code=404;
      }
      utils.writeJson(res, response,code);
    });
};
