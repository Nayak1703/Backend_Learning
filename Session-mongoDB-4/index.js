const express = require("express");
const app = express();
const PORT = 8082;
// Providing the access of all the variable define inside .env to our backend-server 
require("dotenv").config()


// importing the function which connect our server to the database using async-await.
const connectDB = require("./db/config.js")

// we can connect our database to our server we can use promise or async-await

/*
    // ===> Promise <===

    const mongoose = require("mongoose");
    require("dotenv").config()
    const DB_URI = process.env.DB_URI

    mongoose
        .connect(DB_URI)
        .then(() => console.log("Connected to DB at", DB_URI))
        .catch((e) => console.log("Failed to Connect to DB", e))
    
*/

// ===> async-await <===
connectDB()


// Running express server on localhost and given the PORT. 
app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT)
})