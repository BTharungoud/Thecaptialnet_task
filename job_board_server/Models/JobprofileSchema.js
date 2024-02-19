import mongoose from "mongoose";

const JobSchema  = new mongoose.Schema({
    jobtitle : {
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    openings:{
        type:Number,
        required:true
    },
    jobdescripition:{
        type:String,
        required:true
    },
    responsibilities:{
        type:String,
        required:true
    },
    applicants:{
        type:[Object]
    }
})

export default mongoose.model("Jobprofile",JobSchema);