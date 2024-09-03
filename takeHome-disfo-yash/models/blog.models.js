const mongoose = require("mongoose")
const validatorPack = require("validator")

const userSchema = new mongoose.Schema({
    fullName: { type: String, maxLength: 50, default: "" },
    username: { type: String, required: true, unique: true, maxLenght: 25 },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: (value) => validatorPack.isEmail(value),
            message: ({ value }) => `${value} is not a valid email`
        }
    }
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema, "users")

module.exports = userModel