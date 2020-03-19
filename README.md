# REST API-Node.js Server for Product Management System

## Overview
First I have created my Api at Swagger.io [Product_Mgt - API](https://app.swaggerhub.com/apis-docs/shank2512/Product_api/1.0.0) then .. 
By using the [OpenAPI-Spec](https://github.com/OAI/OpenAPI-Specification) from a remote server, you can easily generate a server stub.
After generating server stub I have written logic to implement each api endpoints . You can find my code in each files of service folder. I am using JSON files to store data.

### JSON files - To store data
- Products.json -- To store details about the products in the Inventory
- Reviews.json -- To store reviews of each products in the Inventory
- Tokens.json -- To store temporary token generated to verify authenticated and authorized user
- Users.json -- To store all the users details 
  
### Directions of Use :
  - Generate Access token first to access api endpoints
    - Default user:
      - username: *shank* -- Use this username to get access token by doing *get request* to */users/access* api endpoint
    - Else you can Create new user by doing post request to */users* 
      - Now use that username to do *get request* to */users/access* to generate your access token
  - Use Access token generated in above steps to authorize and access Api endpoints
    
### Running the server
To run the server and install all the required modules(Scripted) , run:

```
npm start
```

To view the Swagger UI interface:

```
open http://localhost:8080/docs
```
