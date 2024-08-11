// we are importing the nanoid-method to make random id
import { nanoid } from "nanoid"
// we are importing the JSONFilePreset-method to make the DB
import { JSONFilePreset } from "lowdb/node"

// initial value of our DB
const defaultData = { cities: [] }

// this will create db.json file if it is not present, and add the initial value of defaultData inside the db.json
const db = await JSONFilePreset("db.json", defaultData)

const getCities = async (req, res) => {
    // we are can accessing the cities from db.json file
    const { cities } = await db.data
    res.send(cities)
}

// accessing the cityObj, which we have added inside req-object during middleware (findCityById) function.
const getCityById = async (req, res) => {
    res.status(200).send(req.cityObj.data)
}

// updating the city which is inside cities's array using splice-method
// i got index of city inisde array (req.cityObj.index) from cityObj 
// { ...req.cityObj.data, ...req.body } -> req.body will overwrite the content of req.cityObj.data, if found same key.
const updateCityById = async (req, res) => {
    db.data.cities.splice(req.cityObj.index, 1, { ...req.cityObj.data, ...req.body })
    await db.write();
    res.status(201).send({ message: "Updated the city", id: req.params.id, ...req.body })
}

const addCity = async (req, res) => {
    try {
        // we are accessing the cities from db.json file and pushing the random id and request-body given bu client
        db.data.cities.push({ id: nanoid(), ...req.body })
        // to add the data inside the db.json given by client from request-body we have to use db.write()
        await db.write();
        res.status(201).send({ message: "Added the city" })
    } catch (err) {
        return res.status(404).send({ message: "Problem in adding the city to the DB" })
    }
}

export { getCities, addCity, getCityById, updateCityById, db }