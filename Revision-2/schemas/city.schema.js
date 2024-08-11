// Importing the joi to validate the data coming from client before storing into DB
import Joi from "joi"

// Creating the schema for the data comigng from client using Joi
const citySchema = Joi.object({
    name: Joi.string().required(),
    landmarks: Joi.array().items(
        Joi.object({
            name: Joi.string(),
            price: Joi.number()
        })
    )
})


export default citySchema;