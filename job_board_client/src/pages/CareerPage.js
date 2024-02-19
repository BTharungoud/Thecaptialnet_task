import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
const Careerpage = () => {
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState("");
  const [popup, setPopup] = useState(false);
  const [userprofiledata, setUserProfileData] = useState([]);
  const [msg, setMsg] = useState("");
  const [jobid, setJobId] = useState("");
  const toast = useToast();
  const [jobprofiles, setJobprofiles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const usermail = sessionStorage.email  
    fetchData(usermail);
    if(popup === false){
      JobprofileFetch();
    }
  }, [(popup === false)]);
  const fetchData = async (usermail) => {
    try {
      console.log(usermail);
      const profilefetch = await fetch(
        `https://job-board-server-eo10.onrender.com/profile?email=${usermail}`
      );
      const profiledata = await profilefetch.json();
      setUserProfileData(profiledata);
      console.log(profiledata);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  const JobprofileFetch = async () => {
    const fetchData = await fetch(
      "https://job-board-server-eo10.onrender.com/jobprofile"
    );
    const Jobprofiles = await fetchData.json();
    setJobprofiles(Jobprofiles);
  };
  function handleApply(id) {
    setJobId(id);
    console.log(userprofiledata);
    let msgs = "";
    for (let key in userprofiledata[0]) {
      if (key !== "additionalfiles" && userprofiledata[0][key].length == 0) {
        msgs = msgs + key + ", ";
      }
    }
    console.log(msgs);
    if (msgs.length > 0) {
      setMsg(msgs);
    }
  }
  async function handlesubmit(email) {
    toast({ title: "applying with profile details" });
    const bodydata = {
      id: jobid,
      email: email,
    };
    const applyjob = await fetch(
      "https://job-board-server-eo10.onrender.com/jobprofile/addApplicant",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodydata),
      }
    );
    const profileapplied = applyjob.json();
    console.log(profileapplied);
    if (applyjob.status === (201 || 200)) {
      toast({ title: "applied sucessfully" });
      setPopup(false);
    }
  }
  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "80%",
            padding: "1%",
          }}
        >
          <label>Search:</label> &nbsp;{" "}
          <input
            placeholder="Filter by JobTitle"
            type="text"
            style={{
              padding: "1%",
              width: "80%",
              borderRadius: "10px",
              color: "black",
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            width: "90%",
            gap: "5px",
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
                      {(profile.applicants.length>0&&profile.applicants.map((ele)=>{if(ele.email == userprofiledata[0].email)return true;else return false}))?"Applied with profile":
                        <button
                          onClick={() => {
                            setPopup(true);
                            handleApply(profile._id);
                            return;
                          }}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#61dafb",
                            padding: "0.5%",
                          }}
                        >
                          Apply
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
                        To apply to this Job applicant profile should be filled.{" "}
                      </h5>
                      <h3
                        style={{ border: "2px solid red", color: "red" }}
                        onClick={() => setPopup(false)}
                      >
                        X
                      </h3>
                    </div>
                    <div
                      style={{ display: "flex", width: "100%", padding: "1%" }}
                    >
                      {msg.length > 0 ? (
                        <div>
                          The following details {msg} are required for applying
                          to the job role. to update
                          <span
                            onClick={() => navigate("/user")}
                            style={{ color: "#61dafb" }}
                          >
                            Click here.
                          </span>
                        </div>
                      ) : (
                        <div style={{ width: "100%" }}>
                          Review Application:-
                          <br />
                          Name:-<span>{userprofiledata[0].fullname}</span>
                          <br />
                          Email:-<span>{userprofiledata[0].email}</span>
                          <br />
                          Dateofbirth:-<span>{userprofiledata[0].dob}</span>
                          <br />
                          Phone:-<span>{userprofiledata[0].phone}</span>
                          <br />
                          description:-<span>{userprofiledata[0].description}</span>
                          <br />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <button
                              onClick={() => navigate("/user")}
                              style={{
                                backgroundColor: "#61dafb",
                                borderRadius: "5px",
                                padding: "1%",
                              }}
                            >
                              update Profile
                            </button>
                            <button
                              onClick={() =>
                                handlesubmit(userprofiledata[0].email)
                              }
                              style={{
                                backgroundColor: "#61dafb",
                                borderRadius: "5px",
                                padding: "1%",
                              }}
                            >
                              submit Profile
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ))}
        </div>
      </div>
    </div>
  );
};
export default Careerpage;
