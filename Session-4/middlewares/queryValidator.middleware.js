// imported Joi to write schema and validate the query
const Joi = require("joi")
// imported validator function that take schema and data, and return its result
const userValidator = require("../validators/validators.js")

// created a schema using Joi to check weather the query-parameter entered by client is correct
const userSearchSchema = Joi.object({
    gender: Joi.string().valid("male", "female"),
    age: Joi.number().integer().min(0).max(100)
}).or("age", "gender")

// defining the function to validate the query
const queryValidator = (req, res, next) => {
    let gender = req.query.gender;
    if (gender)
        gender = req.query.gender.toLowerCase();
    const age = req.query.age;

    const { error, value } = userValidator(userSearchSchema, { gender, age })

    if (error)
        return res.status(422).send(error.details[0].message)
    next()
}

module.exports = queryValidator;