import express from "express";
const app = express();
const PORT = 8082;

import cityRouter from "./routes/cities.routes.js"

// importing lowdb package to make our own database
import { JSONFilePreset } from 'lowdb/node'

// making a object of cities
const defaultData = { cities: [] }
// when we get a request from client, it will automatically
// make db.json file if it is not present and add value of defaultData to it.
const db = await JSONFilePreset('db.json', defaultData)

// app.use() is the method to mount middleware function.
// when ever we get any POST/Put request from client, sending json data to server in its request's body
// then express.json() (middleware function) parse that request and make it available "req.body"
// to access.
app.use(express.json());

app.use("/cities", cityRouter)

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})

export default db