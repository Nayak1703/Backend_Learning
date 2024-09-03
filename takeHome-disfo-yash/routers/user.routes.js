const router = require("express").Router();

const userDataValidator = require("../middlewares/dataValidation.middleware.js")
const clientAuth = require("../middlewares/clientAuth.middleware.js")
const { registerUser, getAllUser, getUserById } = require("../controllers/user.controllers.js")

router.get("/all", clientAuth, getAllUser)
router.get("/:username", getUserById)
router.post("/register", userDataValidator, registerUser)


module.exports = router;