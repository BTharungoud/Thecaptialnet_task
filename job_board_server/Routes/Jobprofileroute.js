import express from "express";
import { getJobprofiles,postJobprofile,updateJobprofile,addApplicant } from "../Controllers/Jobprofilecontroller.js";
const jobprofileroute = new express.Router();

jobprofileroute.get('/',getJobprofiles);
jobprofileroute.post('/new',postJobprofile);
jobprofileroute.put('/addApplicant',addApplicant);
jobprofileroute.put('/update',updateJobprofile);

export default jobprofileroute;