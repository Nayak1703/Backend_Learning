const express = require("express");
const app = express();
const PORT = 8082;

// importing user & currency routes from routes folder
const userRoutes = require("./routes/users.routes.js")
const currencyRoutes = require("./routes/currencies.routes.js")

// define response root path (/) of our web-app.
const homePage = (req, res) => {
    res.send("<h1>HomePage: Currency Database</h1>")
}
app.get("/", homePage);

// define multiple reposne on /users & /currencies endpoints of our web-app. 
app.use("/users", userRoutes);
app.use("/currencies", currencyRoutes);

// We are defining the PORT to access the express server
app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`);
})