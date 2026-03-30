const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
/** 
 * @name registerUserController
 * @description Register a user,expect username,email and password in the request body
 * @access Public
*/
async function registerUserController(req,res) {
    const {username,email,password}=req.body

    if(!username||!email||!password){
        res.status(400).json({
            message:"please provide all required fields"
        })
    }
    const isUserAlreadyExists=await userModel.findOne({
        $or:[{username},{email}]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"account already exists please login"
        })
    }
    const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        email,
        password:hash
    })
    const token=jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            emial:user.email
        }
    })
}
module.exports={
    registerUserController
}
