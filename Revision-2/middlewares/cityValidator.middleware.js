// importing the schema function to validate the clinet'data from req-body
import citySchema from "../schemas/city.schema.js"

const dataValidator = async (req, res, next) => {
    try {
        // to validate the req-body given by client with schema
        await citySchema.validateAsync(req.body);
        next()
    } catch (err) {
        return res.status(422).send({ message: err.message })
    }
}

export default dataValidator