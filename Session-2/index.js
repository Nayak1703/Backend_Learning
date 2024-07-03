// The code in index_old.js is becoming bulky and cluttered, especially as the number of routes increases
// This makes the code harder to read and maintain.
// To avoid clutter and improve readability, we will use a controllers folder.
// We will define all the route handler functions (callback) in separate files within the controller folder.
// Then, we will import these functions into index.js and use them.

const express = require("express")
const app = express()
const PORT = 8082;

// importing functions which is named-export from currencies.controllers.js file
const {homePage, getCurrencies, getCurrencyBySymbol} = require("./controllers/currencies.controllers.js")


// As you can see these function is so much clean and readable
app.get("/", homePage)

app.get('/currencies', getCurrencies)

app.get('/currencies/:symbol', getCurrencyBySymbol)



// lets listen the our backend server using express
app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`);
});
