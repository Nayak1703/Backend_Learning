const express = require("express")
const app = express();
const userRouter = require("./routers/user.routes.js")

require("dotenv").config();
app.use(express.json())
const connectDB = require("./config/db.js")

connectDB()
app.use("/user", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server Listening at PORT: ${process.env.PORT}`)
})