const UserServices = require("../services/user.service.js")
const UserServicesInstance = new UserServices()

const registerUser = async (req, res) => {
    try {
        const result = await UserServicesInstance.register(req.body)
        res.status(201).send(result)
    } catch (error) {
        const { message, code } = error;
        if (code === 11000)
            return res.status(409).send({ code: code, message: "Failed to create new user", reason: "Already Exists in DB" })
        return res.sendStatus(500)
    }
}

const getAllUser = async (req, res) => {
    try {
        const result = await UserServicesInstance.all()
        if (result.length === 0)
            return res.status(404).send({ message: "No Users found" })
        return res.status(200).send(result)

    } catch (error) {
        return res.sendStatus(500)
    }
}

const getUserById = async (req, res) => {
    const { username } = req.params
    try {
        const result = await UserServicesInstance.byUsername(username)
        if (result.length)
            return res.status(200).send(result)
        return res.status(404).send({ message: "User not found!", username })
    } catch (error) {
        return res.sendStatus(500)
    }
}

module.exports = { registerUser, getAllUser, getUserById }