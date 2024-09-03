

const clientAuthentication = (req, res, next) => {
    const KEY = process.env.x_api_key;
    if (req.headers.x_api_key !== KEY)
        return res.status(403).send({ message: "Unauthorised Access" })
    next()
}

module.exports = clientAuthentication