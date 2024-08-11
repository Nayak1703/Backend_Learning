// import db from '../index.js';
// this package will create random uniqe ID
import { nanoid } from "nanoid";

// importing lowdb package to make our own database, JSONFilePreset is the function help to make DB
import { JSONFilePreset } from 'lowdb/node'

// defaultData will store initial value of DB. i.e. { cities: [] }
const defaultData = { cities: [] }
// when we get a request from client, it will automatically
// make db.json file if it is not present and add value of defaultData to it.
const db = await JSONFilePreset('db.json', defaultData)




// since we are fetching response from db.json we will use async function 
const getCity = async (req, res) => {

    const { cities } = await db.data
    console.log(cities)
    res.send(cities)
}

// it will used in POST method,
// we are push the unique-id and request-body that we have recieve from POST request
// to the array of cities which we are getting from db.
const postCity = async (req, res) => {
    db.data.cities.push({ id: nanoid(), ...req.body })
    await db.write()    // we are writing the body inside the db.
    res.status(201).send({ message: "Added" })
}

export { getCity, postCity };