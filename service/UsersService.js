'use strict';
var fs=require('fs');
var url=require('url');
/**
 * Api endpoint to display all users
 * This api endpoint will display all the users in the system
 *
 * username String Searches a user  from users database with username query (optional)
 * returns user
 **/
exports.usersGET = function(req,username) {
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
            fs.readFile('users.json',(err,data)=>{
              data=JSON.parse(data);
              if(typeof username ==='undefined')
               { resolve(data); }
               else{
                 for(var i=0;i<data.length;i++){
                   if(data[i].username==username){
                     resolve(data[i]);
                   }
                 }
                 reject("Invalid Username");
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
 * Api endpoint to create a user
 * This endpoint will create a post request to create a user with the details passed from request body and add the user to the database
 *
 * body Body 
 * no response value expected for this operation
 **/
exports.usersPOST = function(body) {
  return new Promise(function(resolve, reject) {
    fs.readFile('users.json',(err,data)=>{
      data=JSON.parse(data);
      data.push(body);
      data=JSON.stringify(data,null,2);
      fs.writeFile('users.json',data,(err)=>{
        console.log("All set - User added Succesfully");
      });
      resolve(data);  
    })
  });
}

