import React, { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../components/CustomTextField";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function Adminpage() {
    const {setIsLogin} = useAuth()
    const [search, setSearch] = useState("");
    const [expand, setExpand] = useState("");
    const [popup, setPopup] = useState(false);
    const [jobpost, setJobpost] = useState(false);
    const [viewApplicant, setviewApplicant] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();
    const [jobprofiles, setJobprofiles] = useState([]);
    const {
        control,
        handleSubmit,
        formState : {errors}
    }= useForm()

    useEffect(() => {
        JobprofileFetch();
    }, [])

     async function addnewJob(data){
        const result = await fetch("https://job-board-server-eo10.onrender.com/jobprofile/new",
        {method:"POST",
        headers:{
            "Content-type" : "application/json",
        },body: JSON.stringify(data)
        })
        const responseonJobpost = await result.json();
        if(result.status === 201){
            JobprofileFetch();
            toast({title: `Added new post of ${responseonJobpost.jobtitle} position.` });
            setJobpost(false)
        }else{
            toast({title:'Something went wrong'})
        }
        return
    }
    function handleLogout(){
        const adminlogout = window.confirm("Are you sure, you want to logout?");
        if (adminlogout){
            toast({title:'Logging out.'});
            sessionStorage.clear();
            setIsLogin(false)
            navigate("/");
        }else{
            toast({title:"Logout rejected"});
        }

    }
    const JobprofileFetch = async () => {
        const fetchData = await fetch(
            "https://job-board-server-eo10.onrender.com/jobprofile"
        );
        const Jobprofiles = await fetchData.json();
        setJobprofiles(Jobprofiles);
    };
    async function handledownload(cvlink, mail) {
        const newTab = window.open(cvlink, '_blank');
        if (newTab) {
            newTab.focus();
        } else {
            toast({ title: 'Failed to open a new tab. Please allow pop-ups and try again.' })
            console.error('Failed to open a new tab. Please allow pop-ups and try again.');
        }
    }
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                height:"100vh",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                    padding: "1%",
                }}
            >
                <span onClick={() =>
                    handleLogout()   
                } style={{ backgroundColor: "#61dafb", borderRadius: '10px', padding: '1%',cursor:'pointer' }}>Logout</span>
                &nbsp;&nbsp;
                <label>Search:</label> &nbsp;
                <input
                    placeholder="Filter by JobTitle"
                    type="text"
                    style={{
                        padding: "1%",
                        width: "70%",
                        borderRadius: "10px",
                        color: "black",
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                &nbsp;&nbsp;
                <span onClick={() =>
                     setJobpost(true)
                } style={{ backgroundColor: "#61dafb", borderRadius: '10px', padding: '1%',cursor:'pointer' }}>Add Jobpost</span>
            </div>
            {jobpost && jobpost === true && 
            <div
            style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'1%',
                zIndex:'5',
                position:"fixed",
                width:'80%',
                alignSelf:'center',
                backgroundColor:'ThreeDDarkShadow',
                borderRadius:'10px',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                height:'95%'
            }}
            >
                <div style={{display:'flex',justifyContent:"space-between",padding:'1%',}}>
                    <span>
                        TO ADD NEW JOB FILL THE FORM.
                    </span>
                    <span onClick={()=>setJobpost(false)} style={{color:'red',border:'3px solid red',borderRadius:"50%",padding:'1%'}}>X</span>
                    </div>
                    <div style={{display:"flex",flexDirection:'column',width:'70%',padding:'1%',alignSelf:"center",overflowY:"scroll",scrollbarWidth:"thin"}}>
                        <CustomTextField 
                        name='jobtitle'
                        label="Job Title"
                        control={control}
                        error={errors}
                        rules={{required:"Job title required"}}
                        type="String"
                        />
                        <CustomTextField 
                        name='salary'
                        label="Salary range"
                        control={control}
                        error={errors}
                        rules={{required:"Salary range required"}}
                        type="String"
                        />
                        <CustomTextField 
                        name='experience'
                        label="Expecting Experience"
                        control={control}
                        error={errors}
                        rules={{required:"Experience required if 0 exp mention freshers"}}
                        type="String"
                        />
                        <CustomTextField 
                        name='openings'
                        label=" No.of Openings"
                        control={control}
                        error={errors}
                        rules={{required:"Openings required"}}
                        type="number"
                        />
                        <CustomTextField 
                        name='education'
                        label="Education qualification."
                        control={control}
                        error={errors}
                        rules={{required:"education qualification required"}}
                        type="String"
                        />
                        <CustomTextField 
                        name='jobdescripition'
                        label="Role Descripition"
                        control={control}
                        error={errors}
                        rules={{required:"jobdescripition required"}}
                        type="String"
                        />
                        <CustomTextField 
                        name='responsibilities'
                        label="Role and Responsibilities"
                        control={control}
                        error={errors}
                        rules={{required:"role&responsibilities required"}}
                        type="String"
                        />
                        <Button style={{width:'200px',padding:'1%',backgroundColor:'#61dafb'}} onClick={handleSubmit(addnewJob)}>ADD POST</Button>
                        </div>

                </div>
            }
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    width: "90%",
                    gap: "5px",
                    overflowY:((popup || jobpost)?"hidden":"scroll")
                }}
            >
                {jobprofiles.length > 0 &&
                    jobprofiles
                        .filter((profile) =>
                            profile.jobtitle.toLowerCase().includes(search)
                        )
                        .map((profile) => (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyItems: "flex-start",
                                        border: "2px solid #61dafb",
                                        borderRadius: "10px",
                                        padding: "1%",
                                    }}
                                    onClick={() =>
                                        expand.length === 0
                                            ? setExpand(profile._id)
                                            : setExpand("")
                                    }
                                >
                                    <h3>{profile.jobtitle}</h3>
                                    <h6>Qualification: {profile.education}</h6>
                                    <span
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <h6>Salary: {profile.salary}</h6>
                                        <h6>exp.required: {profile.experience}</h6>
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <h6>openings: {profile.openings}</h6>
                                        <h6>Applicants: {profile.applicants.length}</h6>
                                    </span>
                                    <div
                                        style={
                                            expand.length > 0 && expand === profile._id
                                                ? { width: "100%" }
                                                : { display: "none" }
                                        }
                                    >
                                        Job_Descripition:- <br />
                                        <span>{profile.jobdescripition}</span>
                                        <br />
                                        Role and Responsibilities:- <br />
                                        <span>{profile.responsibilities}</span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        {(profile.applicants.length === 0) ? "Still no Applicant for the role" :
                                            <button
                                                onClick={() => {
                                                    setviewApplicant(profile.applicants)
                                                    setPopup(true);
                                                    return;
                                                }}
                                                style={{
                                                    borderRadius: "5px",
                                                    backgroundColor: "#61dafb",
                                                    padding: "0.5%",
                                                }}
                                            >
                                                View Applicant
                                            </button>
                                        }
                                    </div>
                                </div>
                                <div
                                    style={
                                        popup
                                            ? {
                                                display: "flex",
                                                flexDirection: "column",
                                                zIndex: "5",
                                                position: "fixed",
                                                width: "90%",
                                                justifyContent: "center",
                                                height: "70vh",
                                                backgroundColor: "white",
                                                border: "3px solid #282c34",
                                                borderRadius: "10px",
                                                color: "Black",
                                            }
                                            : { display: "none" }
                                    }
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "1%",
                                        }}
                                    >
                                        <h5>
                                            Applicants
                                        </h5>
                                        <h3
                                            style={{ border: "3px solid red", color: "red",borderRadius:"50%" }}
                                            onClick={() => setPopup(false)}
                                        >
                                            X
                                        </h3>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column", // Change to column to stack profiles vertically
                                            overflowY: "scroll",
                                            justifyContent: "flex-start",
                                            width: "100%",
                                        }}
                                    >
                                        {viewApplicant.map((obj, index) => (
                                            <div
                                                key={index} // Add a unique key for each applicant
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    border: "2px solid black",
                                                    width: "90%",
                                                    padding: "1%",
                                                    color: "black",
                                                    marginBottom: "10px", // Add margin between each applicant's details
                                                }}
                                            >
                                                <span>Name: {obj.fullname}</span>
                                                <span>Email: {obj.email}</span>
                                                <span>Phone: {obj.phone}</span>
                                                <span>Resume: {obj.resume}</span>
                                                <button onClick={() => { handledownload(obj.resume, obj.email) }} style={{ padding: '1%', backgroundColor: '#61dafb', width: "250px", borderRadius: '5px' }}>Download cv</button>
                                                <br />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </>
                        ))}
            </div>
        </div>
    )
}
