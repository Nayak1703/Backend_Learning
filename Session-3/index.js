const express = require("express");
const app = express();
const PORT = 8082;



// =========>  Express Routes  <=========

// importing all the routes file to use them
const userRoutes = require("./routes/users.routes.js");
const currencyRoutes = require("./routes/currencies.routes.js");


// function will execute on / path
const homePage = (req, res) => {
    res.send("<h1>Currency Database</h1>");
};
app.get("/", homePage);
// so we are going to use app.use() which we get from express app, app.use() takes 2 parameter.
// 1. endpoint which is in string format eg: "/users", "/currencies", etc...
// 2. adding instane of "routes-file" that we have imported from routes-folder.
// call userRoutes whenever client have url's endpoint localhost:8082/users" then call the "userRouters"
app.use("/users", userRoutes);
app.use("/currencies", currencyRoutes);

app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`);
});
