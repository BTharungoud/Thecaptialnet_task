import Jobprofile from "../Models/JobprofileSchema.js";
import Applicant from "../Models/Applicant_schema.js";
const getJobprofiles = async (req,res)=>{
    try{
        const Jobprofiles = await Jobprofile.find();
        res.status(201).send(Jobprofiles)
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
      }
}

const postJobprofile = async (req,res)=>{
    try{
        const {jobtitle,salary,experience,education,openings,jobdescripition,responsibilities} = req.body
        const JobProfile = new Jobprofile({
            jobtitle:jobtitle,
            salary:salary,
            experience:experience,
            education:education,
            openings:openings,
            jobdescripition:jobdescripition,
            responsibilities:responsibilities,
            applicants:[]
        })
        await JobProfile.save()
        res.status(201).send(JobProfile)
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
      }
}

const updateJobprofile = async (req,res) => {
    try{
        const {id,jobtitle,salary,experience,education,openings,jobdescripition,responsibilities} = req.body
        const JobProfile = await Jobprofile.findByIdAndUpdate({_id:id},
            {
                jobtitle:jobtitle,
                salary:salary,
                experience:experience,
                education:education,
                openings:openings,
                jobdescripition:jobdescripition,
                responsibilities:responsibilities
            },
            { new: true }
            )
        res.status(201).send(JobProfile)
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
      }
}

const addApplicant = async (req,res) => {
    try{
        const {id,email} = req.body
        const applicant = await Applicant.findOne({email:email})
        const Applicants = await Jobprofile.findById({_id:id})
        const updateapplicants = () =>{
            let arr = [];
            if(Applicants.applicants.length>0){
                arr = [...Applicants.applicants,applicant]
                return arr
            }else{
                arr.push(applicant)
                return arr
            }
        }
        const JobProfile = await Jobprofile.findByIdAndUpdate({_id:id},
            {
                applicants: updateapplicants()
            },
            { new: true }
            )
        res.status(201).send(JobProfile)
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
      }
}

export{getJobprofiles,postJobprofile,updateJobprofile,addApplicant}