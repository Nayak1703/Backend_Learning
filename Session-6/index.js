// Initializing the express server
const express = require("express")
const app = express()
const PORT = 8082;


require("dotenv").config();

const connectDB = require("./db/config.js")
const blogRouter = require("./router/blog.routes.js")

app.use(express.json())
connectDB()

app.use("/blogs", blogRouter)

app.listen(PORT, () => {
    console.log("The server is running on port: ", PORT)
})



