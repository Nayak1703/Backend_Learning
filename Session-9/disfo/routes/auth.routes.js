const router = require("express").Router()

const {postSignup, postLogin } = require("../controllers/auth.controller")
const { userValidationSchema } = require("../validations/user.validator");
const {userLoginValidationSchema} = require("../validations/userLogin.validator")
const { validateSchema } = require("../middlewares/validate.middleware");

const validateUserSignUp = validateSchema(userValidationSchema);
const validateUserLogin = validateSchema(userLoginValidationSchema);

router.post("/signup", validateUserSignUp, postSignup)
router.post("/login",validateUserLogin, postLogin )

module.exports = router
