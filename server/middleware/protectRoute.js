const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const protectRoute = async (req,res,next)=>{
    const token = req.cookies.jwt;
    
    if(!token){
        return res.status(401).json({message : "Unauthorised"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next();

};
module.exports = {protectRoute};