import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./Routes/Loginroute.js"
import profileroute from "./Routes/Profileroute.js";
import jobprofileroute from "./Routes/Jobprofileroute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT
const MONGO = process.env.MONGO
app.use(cors());
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Server running")
})

app.use("/login",route)
app.use("/profile",profileroute)
app.use('/jobprofile',jobprofileroute)

app.listen(PORT,async()=>{
    console.log(`server started sucessfully at ${PORT}`)
    await mongoose.connect(MONGO)
    console.log("connected to MongoDB")
})