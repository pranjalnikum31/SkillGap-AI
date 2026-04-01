const mongoose=require("mongoose")

const blackListTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required to be added to the blacklist"]
    }
},{timestamps:true})

const tokenBlackListModel=mongoose.model("blacklisttoken",blackListTokenSchema)

module.exports=tokenBlackListModel