const Joi = require("joi")
const validateData = require("../validators/validators.js")

const userDataSchema = Joi.object({
    fullName: Joi.string().max(50).default(''),
    username: Joi.string().max(25).required(),
    email: Joi.string().email().required()
})

const userDataValidator = (req, res, next) => {
    const { error } = validateData(userDataSchema, req.body)
    if (error)
        return res.status(422).send({ message: `wm: ${error.details[0].message}` })
    next()
}

module.exports = userDataValidator;

