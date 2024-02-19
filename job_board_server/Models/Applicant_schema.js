import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true
    },
    fullname :{
        type:String,
        required:true
    },
    dob :{
        type:String,
    },
    city :{
        type:String,
    },
    resume :{
        type:String,
    },
    additionalfiles :{
        type:[String],
    },
    phone :{
        type:String,
    },
    description :{
        type:String,
    },
})

export default mongoose.model("Applicant",applicantSchema);