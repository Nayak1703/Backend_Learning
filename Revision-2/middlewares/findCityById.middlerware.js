import { db } from "../controllers/cities.controllers.js"

const cityById = async (req, res, next) => {
    // accessing the city-id from url parameter
    const { id: cityId } = req.params;
    // accessing cities array from db.json
    const { cities } = await db.data

    let cityIndex;
    // if city-id given by client matches the id from cities array from db.json
    // then store that city inside the requiredCity. 
    const requiredCity = cities.find((city, index) => {
        if (city.id === cityId) {
            cityIndex = index;
            return city
        }
    })

    // if requiredCity have value then, make a object (cityObj) inside  the request-obj.
    // and add the index and city-data as key value pair.
    if (requiredCity) {
        req.cityObj = {
            index: cityIndex,
            data: requiredCity
        };
        // then call next middelware function
        return next()
    }
    // If city is not avaiable then this message will be shown
    res.status(404).send({ messsage: `city with id ${req.params.id} is not available` })
}

export default cityById