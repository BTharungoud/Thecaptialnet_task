import Applicant from "../Models/Applicant_schema.js"


const getUserProfile = async (req, res) => {
    try {
        const { email } = req.query;
        const query = {};
        if (email) {
            query.email = email;
        }
      if ( !email ) {
        res.status(400).send("Please enter all fields");
        return;
      }
      const UserProfile = await Applicant.find(query);
      res.status(201).send(UserProfile);
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).send("Internal Server Error");
    }
  };

const signupProfile = async (req,res) =>{
    try{
        const { fullname,email } = req.body
        const newprofile  = new Applicant({
            email:email,
            fullname:fullname,
            dob:'',
            city:'',
            resume:'',
            additionalfiles:[],
            phone:'',
            description:''
        })
        await newprofile.save();
        res.status(201).send(newprofile)
    }
    catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
    }
}

const updateProfile = async (req, res) => {
    try {
        const { fullname, email, dob, city, resume, additionalfiles, phone, description } = req.body;
        const updatedProfile = await Applicant.findOneAndUpdate(
            { email: email },
            {
                fullname: fullname,
                dob: dob,
                city: city,
                resume: resume,
                additionalfiles: additionalfiles,
                phone: phone,
                description: description
            },
            { new: true }
        );
        res.status(201).send(updatedProfile);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
    }
};

  


export{getUserProfile, signupProfile,updateProfile}