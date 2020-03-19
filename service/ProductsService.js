'use strict';
var fs=require('fs');
var url=require('url');
/**
 * Api endpoint to delete the product from inventory
 * This endpoint is used for removing the product from the inventory
 *
 * id String id of the product
 * returns InventoryItem
 **/
exports.productsIdDELETE = function(req,id) {
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
            fs.readFile('products.json',(err,data)=>{
              data=JSON.parse(data);
              var index=-1;
              for(var i=0;i<data.length;i++){
                if(data[i].id==id){
                  index=i;
                  break;
                }
              }
              if(index!=-1){
                data.splice(i,1);
                data=JSON.stringify(data,null,2);
                fs.writeFile('products.json',data,(err)=>{
                  console.log("All set - Item deleted Succesfully");
                });
                resolve(data);
              }
              else{
                reject("Id not found");
              }
            });
            fs.readFile('reviews.json',(err,data)=>{
              data=JSON.parse(data);
              var index=-1;
              for(var i=0;i<data.length;i++){
                if(data[i].id==id){
                  index=i;
                  break;
                }
              }
              if(index!=-1){
                data.splice(i,1);
                data=JSON.stringify(data,null,2);
                fs.writeFile('reviews.json',data,(err)=>{
                  console.log("All set - Item deleted Succesfully");
                });
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
    })
      
  });
}


/**
 * Api endpoint to search specific product
 * Just provide the Id and find all the product details with that id
 *
 * id String Enter Product Id
 * returns InventoryItem
 **/
exports.productsIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    fs.readFile('products.json',(err,data)=>{
      data=JSON.parse(data);
      for(var i=0;i<data.length;i++){
        if(data[i].id==id){
          resolve(data[i]);
          break;
        }
      }
      reject("Id not found") ;
    });  
  });
}


/**
 * Api endpoint to update product details
 * Update the existing details of the item such as price , quantity of the product which are subject to change
 *
 * body Update It is going to return the updated details of the item in the inventory (optional)
 * id String id of the product
 * returns InventoryItem
 **/
exports.productsIdPUT = function(req,body,id) {
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
            fs.readFile('products.json',(err,data)=>{
              data=JSON.parse(data);
              var flag=false;
              for(var i=0;i<data.length;i++){
                if(data[i].id==id){
                  flag=true;
                  Object.keys(body).forEach(key=>{
                    data[i][key]=body[key];
                  });
                  console.log(data[i]);
                  break;
                }
              }
            if(flag){
              data=JSON.stringify(data,null,2);
              fs.writeFile('products.json',data,(err)=>{
                console.log("All set - Item updated Succesfully");
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

