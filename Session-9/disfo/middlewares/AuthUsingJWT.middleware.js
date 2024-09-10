// importing the jwt.
const jwt = require ("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    // const token = req.cookies.token    -> if we are accessing the token from cookie.
    // in this case we are accessing the token from header passed in request.rest file.

    // accessing the token 
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    
    // if token is not present then send below response
    if(!token)
        return res.status(403).send({message: "Authorization Denied"})

    // if token is present then in header, then verfiy that token using 
    // jwt.verify(token-from-req-header, secreat-key, callBack-func)
    // secreat-key: key which is used to make jwt-token
    // callback-function takes 2 parameter
    // 1. err: if we get any error, then its value will be true.
    // 2. decoded: payload info.
    await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded)=> {
        if(err)
            return res.status(403).send({messafe: "Token is invalid or expired"});

        console.log("decoded",decoded)
        // here we are adding user key in req-obj so that other middleware function or controller function
        // can access the payload and use them.
        req.userId = decoded.userId

        // calling next middleware function.
        next()
    }) ;
}

module.exports = {verifyToken}