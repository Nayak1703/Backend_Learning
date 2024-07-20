// importing "dotenv" package and using config() method from "dotenv"
require("dotenv").config()


const clientAuth = (req, res, next) => {

    if (req.headers.authorization !== process.env.PASSWORD)
        return res.sendStatus(403)

    next()
}

module.exports = clientAuth;