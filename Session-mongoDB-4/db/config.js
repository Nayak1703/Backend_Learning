// Importing mongoose.
const mongoose = require("mongoose");

// Accessing the DB_URI which is in enviorment-variable with the help of "dotenv" package
const DB_URI = process.env.DB_URI

// Establishing the connection between Database and Backend-server, using DB_URI which is define in .env file.

// async-await
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to DB at", DB_URI)
    } catch (error) {
        console.log("Failed to Connect to DB", error)
    }
}


module.exports = connectDB