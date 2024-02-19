import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    fullname :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model('Register',registerSchema)