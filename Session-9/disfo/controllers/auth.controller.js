const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (req, res) => {
  try {
    const result = await AuthServiceInstance.signUp(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(409).json({
        message: "Failed to create new user",
        reason: "Already Exists in DB",
      });
    } else {
      res.status(500).json({ message: "Failed to create new user", error });
    }
  }
};

const postLogin = async (req, res) => {
  try {
    const result = await AuthServiceInstance.login(req.body);
    console.log(result);
    if (result.isLoggedIn) {
      // sending token as response using express's res.cookie
      res.cookie("token", result.token, { maxAge: 60000, httpOnly: true });
      return res.status(200).send({
        isLoggedIn: result.isLoggedIn,
        userId: result.actualUser._id,
        jwtToken : result.token,
        message: "Login successful!", 
      });
    }

    res.status(401).send({
      message: "Login failure!, either username or password in incorrect",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Sever error finding in thw user. Please try again" });
  }
};

module.exports = { postSignup, postLogin };
