const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    fullName: {type: String, default: ""},
    username: {type: String, unique: true, lowercase: true, required: true},
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, required: true}
});

const authModel = mongoose.model("Auth", authSchema, "Auths")
module.exports = authModel;
