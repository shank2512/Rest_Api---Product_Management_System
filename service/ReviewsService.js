'use strict';
var fs=require('fs');
var url=require('url');
var uniqid = require('uniqid');
/**
 * Api endpoint to add review of product
 * It adds the review for particular product
 *
 * body Reviews Returns all the reviews of given product id (optional)
 * id String Product id
 * no response value expected for this operation
 **/
exports.addReview = function(req,body,id) {
  return new Promise(function(resolve, reject) {
    var query=url.parse(req.url,true).query;
    fs.readFile('tokens.json',(err,tok)=>{
      if(err){
        reject("Invalid Token");
      }
      else{
        tok=JSON.parse(tok);
        if(JSON.stringify(tok)!=='{}'){
          var Token=tok.token;
          if(query.token==Token){
            fs.readFile('reviews.json',(err,data)=>{
              data=JSON.parse(data);
              var flag=false;
              for(var i=0;i<data.length;i++){
                if(data[i].id==id){
                  flag=true;
                  body.id=uniqid();
                  data[i].reviews.push(body);
                  break;
                }
              }
            if(flag){
              data=JSON.stringify(data,null,2);
              fs.writeFile('reviews.json',data,(err)=>{
                console.log("All set - Review added Succesfully");
              });
              resolve(data);  
            }
            else{
              reject("Id not found");
            }
            });  
          }
          else{
            reject("Wrong token");
          }
        }
        else{
          reject("Invalid Token");
        }
      }
    });
  });
}


/**
 * Api endpoint to display all reviews of particular product
 * It will display all the reviews of particular product
 *
 * id String Enter Product Id
 * returns Reviews
 **/
exports.productsIdReviewsGET = function(req,id) {
  return new Promise(function(resolve, reject) {
    var query=url.parse(req.url,true).query;
    fs.readFile('tokens.json',(err,tok)=>{
      if(err){
        reject("Invalid Token");
      }
      else{
        tok=JSON.parse(tok);
        if(JSON.stringify(tok)!=='{}'){
          var Token=tok.token;
          if(query.token==Token){
            fs.readFile('reviews.json',(err,data)=>{
              data=JSON.parse(data);
              var index=-1;
              for(var i=0;i<data.length;i++){
                if(data[i].id==id){
                  index=i;
                  break;
                }
              }
            if(index>=0){
              resolve(data[i]);  
            }
            else{
              reject("Id not found");
            }
            });  
          }
          else{
            reject("Wrong token");
          }
        }
        else{
          reject("Invalid Token");
        }
      }
    });
  });
}


/**
 * Api endpoint to delete the review of product from inventory
 * This endpoint is used for deleting the review product from the inventory
 *
 * idp String Enter Product Id
 * idr String Enter Review id to be deleted
 * returns Reviews
 **/
exports.productsIdpReviewsIdrDELETE = function(req,idp,idr) {
  return new Promise(function(resolve, reject) {
    var query=url.parse(req.url,true).query;
    fs.readFile('tokens.json',(err,tok)=>{
      if(err){
        reject("Invalid Token");
      }
      else{
        tok=JSON.parse(tok);
        if(JSON.stringify(tok)!=='{}'){
          var Token=tok.token;
          if(query.token==Token){
            fs.readFile('reviews.json',(err,data)=>{
              data=JSON.parse(data);
              var index=-1;
              for(var i=0;i<data.length;i++){
                if(data[i].id==idp){
                  index=i;
                  break;
                }
              }
            if(index>=0){
                var revarr=data[index].reviews;
                for(var i=0;i<revarr.length;i++){
                  if(revarr[i].id==idr){
                    revarr.splice(i,1);
                    data[index].reviews=revarr;
                    data=JSON.stringify(data,null,2);
                    fs.writeFile('reviews.json',data,(err)=>{
                      console.log("All set - Review deleted Succesfully");
                    });
                    resolve(JSON.parse(data)[index]);
                    break;
                  }
                }
                reject("Review id not found");
            }
            else{
              reject("Product Id not found");
            }
            });  
          }
          else{
            reject("Wrong token");
          }
        }
        else{
          reject("Invalid Token");
        }
      }
    });
  });
}


/**
 * Api endpoint to display only the particular review of product
 * It will display only the particular review of product
 *
 * idp String Enter Product Id
 * idr String Enter id of review
 * returns revw
 **/
exports.productsIdpReviewsIdrGET = function(req,idp,idr) {
  return new Promise(function(resolve, reject) {
    var query=url.parse(req.url,true).query;
    fs.readFile('tokens.json',(err,tok)=>{
      if(err){
        reject("Invalid Token");
      }
      else{
        tok=JSON.parse(tok);
        if(JSON.stringify(tok)!=='{}'){
          var Token=tok.token;
          if(query.token==Token){
            fs.readFile('reviews.json',(err,data)=>{
              data=JSON.parse(data);
              var index=-1;
              for(var i=0;i<data.length;i++){
                if(data[i].id==idp){
                  index=i;
                  break;
                }
              }
            if(index>=0){
                var revarr=data[index].reviews;
                for(var i=0;i<revarr.length;i++){
                  if(revarr[i].id==idr){
                    resolve(data[index].reviews[i]);
                    break;
                  }
                }
                reject("Review id not found");
            }
            else{
              reject("Product Id not found");
            }
            });  
          }
          else{
            reject("Wrong token");
          }
        }
        else{
          reject("Invalid Token");
        }
      }
    });

  });
}


/**
 * Api endpoint to update the review of product
 * Change the review of the given product
 *
 * body Revw Updated review of the product (optional)
 * idp String Enter Product Id
 * idr String Enter Review id to be updated
 * returns revw
 **/
exports.productsIdpReviewsIdrPUT = function(req,body,idp,idr) {
  return new Promise(function(resolve, reject) {
    var query=url.parse(req.url,true).query;
    fs.readFile('tokens.json',(err,tok)=>{
      if(err){
        reject("Invalid Token");
      }
      else{
        tok=JSON.parse(tok);
        if(JSON.stringify(tok)!=='{}'){
          var Token=tok.token;
          if(query.token==Token){
            fs.readFile('reviews.json',(err,data)=>{
              data=JSON.parse(data);
              var index=-1;
              for(var i=0;i<data.length;i++){
                if(data[i].id==idp){
                  index=i;
                  break;
                }
              }
            if(index>=0){
                var revarr=data[index].reviews;
                for(var i=0;i<revarr.length;i++){
                  if(revarr[i].id==idr){
                    revarr[i].review=body.review;
                    data[index].reviews=revarr;
                    data=JSON.stringify(data,null,2);
                    fs.writeFile('reviews.json',data,(err)=>{
                      console.log("All set - Review updated Succesfully");
                    });
                    resolve(revarr[i]);
                    break;
                  }
                }
                reject("Review id not found");
            }
            else{
              reject("Product Id not found");
            }
            });  
          }
          else{
            reject("Wrong token");
          }
        }
        else{
          reject("Invalid Token");
        }
      }
    });
  });
}

