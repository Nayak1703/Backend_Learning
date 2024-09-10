// making middleware to authenticate the route.
const passport = require("passport");
const authenticate = passport.authenticate("jwt", { session: false });

module.exports = {authenticate}