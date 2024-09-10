const Joi = require("joi");

const userLoginValidationSchema = Joi.object().keys({
    username: Joi.string().required().max(25),
    password: Joi.string().required()
})

module.exports = {userLoginValidationSchema}