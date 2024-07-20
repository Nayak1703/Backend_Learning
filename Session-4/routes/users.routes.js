// importing express to access its method Router() 
const Router = require("express").Router();

// importing controllers functions to define response we will send based on request
const { getAllUsers, getUserBySearch, getUserByUUID } = require("../controllers/users.controllers.js");

// imported middleware-function to authenticate-the-client and validate-the-query 
const clientAuth = require("../middlewares/clientAuth.middleware.js")
const queryValidator = require("../middlewares/queryValidator.middleware.js")

// Express read and execute the code line by line so
// this middleware will get applied to all the route i.e define for /users endpoint.
// because i want that all the route should check for client-authentication
Router.use(clientAuth)

//  Assign the queryValidator middleware function to the /search route.
//  Ensure that the controller functions (getAllUsers, getUserBySearch, getUserByUUID) 
//  are called after the middleware function.
//  The functions will execute in the order they have been placed.

//  /  =>  clientAuth --if-pass--> getAllUsers
Router.get("/", getAllUsers)    
//  /search  =>  clientAuth --if-pass--> queryValidator --if-pass--> getUserBySearch
Router.get("/search", queryValidator, getUserBySearch)
// /:uuid  =>  clientAuth --if-pass--> getUserByUUID
Router.get("/:uuid", getUserByUUID)     

module.exports = Router;