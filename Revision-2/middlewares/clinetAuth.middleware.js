import dotenv from "dotenv"
dotenv.config();

const clientAuth = (req, res, next) => {
    if (req.headers.authorization !== process.env.ADMIN_KEY)
        return res.sendStatus(403)
    next()
}

export default clientAuth;