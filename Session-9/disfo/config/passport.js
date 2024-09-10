// importing Strategy & ExtractJwt class from passport-jwt package.
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// first we will extract the Jwt fro header.
const options = {
    // this key will do the extraction
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY     // secret-key that used to make JWT
};


// This constructor will take 2 parameter,
// 1. option: have details of the client-side jwt and secreat-key
// 2. callback function: once the token have been verified, then this callback-function is called. 
//    this CB function takes 2 parameter
//      1.  payload: payload which we get from jwt token
//      2.  done: is another CB function it will pass the payload for next middleware/controller to use if
//                verification is successful and if failed it will send response with error.
const ourJwtStrategy = new JWTStrategy(options, async (payload, done)=>{
    try {
        // we are passing, userId for next middelware
        return done(null, payload.userId)
    }catch(error) {
        // if the verification failed then it will send the "unauthorize" as response
        return done(error, false)
    }
})

module.exports = ourJwtStrategy
