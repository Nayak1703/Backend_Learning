const express = require("express");
const app = express();
const PORT = 8082;
require('dotenv').config()

const connectDB = require("./db/config.js")
const blogRouter = require("./routes/blogs.routes.js")

connectDB()

// this is express middleware to parse the request-body which is in JSON format, in our express-server
app.use(express.json())

// i have created a blog-router for all my request-method realted to /blogs
app.use("/blogs", blogRouter)


app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})