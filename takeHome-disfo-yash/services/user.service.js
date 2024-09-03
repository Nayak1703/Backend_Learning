const User = require("../models/blog.models.js")

class UserServices {
    register = async (userDataObj) => await User.create(userDataObj)
    all = async () => await User.find()
    byUsername = async (username) => await User.find({
        username: username
    })
}

module.exports = UserServices