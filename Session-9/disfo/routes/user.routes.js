const router = require("express").Router();
const {
  getAllUsers,
  postRegister,
  getUserByUsername,
} = require("../controllers/user.controller");
const { checkAdminKey } = require("../middlewares/admin.middleware");
const { userValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware");
const {verifyToken} = require("../middlewares/AuthUsingJWT.middleware");
const  {authenticate} = require("../middlewares/AuthUsingPassport.middleware")

const validateUser = validateSchema(userValidationSchema);

router.post("/register", validateUser, postRegister);
router.get("/all", checkAdminKey, getAllUsers);
// router.get("/:username",verifyToken, getUserByUsername);
router.get("/:username",authenticate,getUserByUsername)

module.exports = router;
