const router = require("express").Router();

// Import users's controller function as we are using all the controller-function of users here
const {
    getCurrencies,
    getCurrencyBySymbol,
} = require("../controllers/currencies.controllers.js");


// since we are using this file only with /users endpoint so no need to write /users here because its repetative.
router.get("/", getCurrencies)
router.get("/:symbol", getCurrencyBySymbol)

// it is named export using default comman-js and we are exporting "router" instance of express's Router() method
// inside "router" instance object we have define all our routes of currencies
module.exports = router;