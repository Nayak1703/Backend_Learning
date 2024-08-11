// const express= require("express")
import express from "express"
const app = express();
const PORT = 8082;

import cityRouter from "./Routes/cities.routes.js"

// to parse the json data present inside request-body given by client. 
app.use(express.json())

app.use("/cities", cityRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})