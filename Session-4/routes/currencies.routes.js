// importing express to access its method Router() 
const Router = require("express").Router();

// importing controllers functions to define response we will send based on request
const { getCurrencies, getCurrencyBySymbol } = require("../controllers/currencies.controllers.js")

// assigned the imported function to the particular request-method and route.
Router.get("/", getCurrencies)
Router.get("/:symbol", getCurrencyBySymbol)

module.exports = Router