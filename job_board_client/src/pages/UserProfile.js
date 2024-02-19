import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import CustomTextField from "../components/CustomTextField";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../FirebaseConfig.js";
import { useToast } from "@chakra-ui/react";
export const UserProfile = () => {
  const toast = useToast();
  const [userprofiledata, setUserProfileData] = useState([]);
  const usermail = sessionStorage.email
  const [resumelink, setResumelink] = useState(null);
  const [additionalfilelink, setAdditionalfilelink] = useState(null);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    fetchData(usermail)
  }, [])
  async function fetchData(usermail) {
    try {
      console.log(usermail);
      const profilefetch = await fetch(
        `https://job-board-server-eo10.onrender.com/profile?email=${usermail}`
      );
      const profiledata = await profilefetch.json();
      setUserProfileData(profiledata);
      console.log(profiledata);
      reset(profiledata[0])
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      return userprofiledata[0]
    }
  };
  async function handleuploadresume(resumedata) {
    const fullname = sessionStorage.Name;
    console.log("resume", fullname, resumedata)
    if (resumedata !== null) {
      console.log("resume", fullname)
      const resumerif = ref(
        storage,
        `Resumes/${fullname}/${resumedata.name}`
      );
      uploadBytes(resumerif, resumedata).then((snapshot) => {
        toast({ title: "resume uploaded downloading url" });
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setResumelink(url);
            console.log(url);
          })
          .catch((err) => console.log(err, "err at downloading url"));
      });
    }
  }
  async function handleuploadfiles(additionfiles) {
    const fullname = sessionStorage.Name;
    if (additionfiles !== null) {
      const filesrif = ref(
        storage,
        `Additionalfiles/${fullname}/${additionfiles.name}`
      );
      uploadBytes(filesrif, additionfiles).then((snapshot) => {
        toast({ title: "file uploaded downloading url" });
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setAdditionalfilelink(url);
            console.log(url);
          })
          .catch((err) => console.log(err, "err at downloading url"));
      });
    }
  }
  const onSubmit = async (data) => {
    data.resume = resumelink;
    data.additionalfiles = [additionalfilelink]
    const stringifyobj = JSON.stringify(data)
    console.log(stringifyobj);
    toast({ title: "Fetch call started" });
    const updateProfile = await fetch(`https://job-board-server-eo10.onrender.com/profile/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringifyobj
    })
    if (updateProfile.status == 201) {
      toast({ title: "Profile updated" });
    } else {
      toast({ title: "Something went wrong" })
    }
    const profiledata = await updateProfile.json();
    reset(profiledata)
    // setOnpageload(!onpageload);
    console.log(profiledata)
  };
  return (
    <div style={{ width: "100%" }}>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          height: "90%",
          backgroundColor: "white",
          borderRadius: "10px",
          color: "black",
          alignItems: "center",
          padding: "0.5%",
          margin: "0.5%",
          marginLeft: "4.5%",
        }}
      >
        <h2>PROFILE</h2>
        <div>
          <CustomTextField
            name="fullname"
            control={control}
            label="Fullname"
            rules={{ required: "Fullname Required" }}
          />
          <CustomTextField
            name="email"
            control={control}
            label="Email"
            error={errors.email}
            rules={{
              required: "Email is required",
              validate: (value) => {
                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(value)) {
                  return "Enter a valid email";
                }
              },
            }}
          />
          <CustomTextField
            name="dob"
            control={control}
            label="Date of birth"
            error={errors}
            rules={{ required: "Date of Birth Required" }}
            type="date"
          />
          <CustomTextField
            name="city"
            control={control}
            label="City"
            error={errors}
            rules={{ required: "City Required" }}
          />
          <label>Resume</label>
          <input type="file" style={{ padding: '1%', border: '1px solid black', borderRadius: '8px', width: '100%' }} onChange={(e) => { handleuploadresume(e.target.files[0]) }} />
          <label>Additionalfiles</label>
          <input type="file" style={{ padding: '1%', border: '1px solid black', borderRadius: '8px', width: '100%' }} onChange={(e) => { handleuploadfiles(e.target.files[0]) }} />

          <CustomTextField
            name="phone"
            control={control}
            label="Phone"
            error={errors}
            rules={{ required: "Phone number Required" }}
          />
          <CustomTextField
            name="description"
            control={control}
            label="Description"
            error={errors}
          />
          <Button
            width="250px"
            colorScheme="blue"
            borderRadius="8px"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
