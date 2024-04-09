const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')

const verifyJWT = async(req,_,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("Generated token:",token);
    
        if(!token) {
           throw Error(401, "Unauthorized: Missing access token") 
        }
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

        if (!decodedToken) {
            throw Error(401, "Unauthorized: Invalid access token");
        }

        console.log("Token: " +decodedToken);
        const admin = await Admin.findById(decodedToken?._id).select("-password -refreshToken")
            if(!admin) {
                throw Error(401, "Unauthorized: admin not found")
            }
        
            req.admin = admin;
        next()
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
   verifyJWT,
}