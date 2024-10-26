import mongoose from 'mongoose'
const UserSchema=new mongoose.Schema({
    username:{type:String,unique:True},
    password: String,
},{timestamps:true});
module.exports=UserModel;
const UserModel=mongoose.model("User",UserSchema);
