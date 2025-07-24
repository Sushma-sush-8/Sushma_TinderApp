const jwt = require("jsonwebtoken")
const User = require("../models/user");

const userAuth =  async (req,res,next) => {
    try{
        //read token from  req cookie
        const { token } = req.cookies;
        //validate the cookie
    
        const decodeObj = jwt.verify(token, "Sushtoken@123");
    
        //here id is the user id of that particular user
        const {_id} = decodeObj;
    
        //find the user with that id
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user; //attach the user to the request object
        next();
    } catch(err){
        res.status(401).send("Unauthorized access");
    }
}
``
module.exports = userAuth;