'use strict';
var fs=require('fs');
var url=require('url');
var uniqid = require('uniqid');
/**
 * Api endpoint to display all available products
 * It displays all the available products in the inventory 
 *
 * limit Integer maximum number of records to return in request (optional)
 * returns List
 **/
exports.productsGET = function(limit) {
  return new Promise(function(resolve, reject) {
    fs.readFile('products.json',(err,data)=>{
      data=JSON.parse(data);
      if(typeof limit ==='undefined')
        { resolve(data); }
        else{
          resolve(data.slice(0,limit));
        }  
      });
  });
}


/**
 * Adds item to the Inventory
 * It adds the item with all its details in inventory
 *
 * body InventoryItem Details about the item you want to add in Inventory (optional)
 * no response value expected for this operation
 **/
exports.productsPOST = function(req,body) {
  return new Promise(function(resolve, reject) {
    console.log(req.url);
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
            fs.readFile('products.json',(err,data)=>{
              data=JSON.parse(data);
              body.id=uniqid();
              data.push(body);
              data=JSON.stringify(data,null,2);
              fs.writeFile('products.json',data,(err)=>{
                console.log("All set - Item added Succesfully");
              });
              fs.readFile('reviews.json',(err,revdata)=>{
                var obj={id:body.id,name:body.name,reviews:[]};
                revdata=JSON.parse(revdata);
                revdata.push(obj);
                revdata=JSON.stringify(revdata,null,2);
                fs.writeFile('reviews.json',revdata,(err)=>{
                  console.log('review object created');
                });
              });
              resolve(data);  
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
    })
    
  });
}

