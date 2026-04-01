const express=require("express")
const authRouter=express.Router()
const authController=require("../controllers/auth.controller")
const authMiddleware=require("../middleware/auth.middleware")
/**
 * @route POST/api/auth/register
 * @description Register a user
 * @access Public
 */
authRouter.post("/register",authController.registerUserController)

/** 
 * @route POST/api/auth/login
 * @description Login a user with email and password
 * @access Public
*/
authRouter.post("/login",authController.loginUserController)


/**
 * @route GET/api/auth/logout
 * @description clear token form user's cookie and add the token to the blacklist
 * @access Public
 */

authRouter.get("/logout",authController.logoutUserController)

/**
 * @route GET/api/auth/get-me
 * @description Get the details of the logged in user
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)
module.exports=authRouter