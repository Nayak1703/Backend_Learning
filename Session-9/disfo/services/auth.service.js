// importing jwt
const jwt = require("jsonwebtoken");
// importing the hashed-algo
const bcrypt = require("bcrypt");
const Auth = require("../models/auth.model");

class AuthService {
  signUp = async (payload) => {
    // we are extracting the password from req.body
    const { password } = payload;
    // salt is the random data we add before hashing the password, in this case 10
    // 10 is condiser is perfect, not too-high or low.
    const salt = await bcrypt.genSalt(10);
    // this will take the salt and password and hashed it.
    // note: hashing is the expensive process and it includes more cores generally 4 cores.
    const hashedPassword = await bcrypt.hash(password, salt);

    return new Auth({ ...payload, password: hashedPassword }).save();
  };

  login = async (payload) => {
    const { username, password } = payload;
    const actualUser = await Auth.findOne({ username });
    if (actualUser.username)
      // this is used to access the sibling properties or methods
      return {
        isLoggedIn: await bcrypt.compare(password, actualUser.password),
        actualUser,
        token: await this.generateToken({ userId: actualUser._id }),
      };
    return false;
  };

//   using JWT to generate the token
  generateToken = async (payload) => {
    // we are generating the token and it will expire in 60000ms -> 1 min
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1m",
    });
    return token;
  };
}

module.exports = AuthService;
