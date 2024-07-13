import db from '../index.js';
// this package will create random uniqe ID
import { nanoid } from "nanoid";

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