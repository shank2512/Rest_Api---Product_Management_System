'use strict';
var fs=require('fs');
var jwt=require('jsonwebtoken');


/**
 * Api endpoint to get access token
 *
 * username String Username of user in the system
 * returns inline_response_200
 **/
exports.usersAccessGET = function(username) {
  return new Promise(function(resolve, reject) {
      fs.readFile('users.json',(err,userdata)=>{
        userdata=JSON.parse(userdata);
        console.log(userdata);
        for(var i=0;i<userdata.length;i++){
          if(userdata[i].username==username){
            var token=jwt.sign({
              user:username
            }, 'secret', { expiresIn: 60 * 60 },
            );
            var tokendata={"token":token};
            tokendata=JSON.stringify(tokendata,null,2);
            fs.writeFile('tokens.json',tokendata,(err)=>{
              console.log("Token added Succesfully");
            })
            resolve(tokendata);
          }
        }
        reject("Username not found");
      });
  });
}

