import Register from "../Models/RegisterSchema.js"
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const  TokenKey = process.env.TokenKey
const RegisterUser = async (req, res) => {
    try {
      const { fullname , email, password } = req.body;
      if (!fullname || !email || !password) {
        res.status(400).send("Please enter all fields");
        return;
      }
      const existingUser = await Register.findOne({ email: email });
      if (existingUser) {
        res.status(409).send("User already exists with this email. Please go for login.");
        return;
      }
      const salt = await bcrypt.genSalt(9);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new Register({
        email: email,
        fullname:fullname,
        password: hashedPassword
      });
      await newUser.save();
      res.status(201).send("Successfully registered. You can now log in.");
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).send("Internal Server Error");
    }
  };
  
const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password || password == null) {
        res.status(400).send("Enter proper email & password");
        return;
      }
  
      const user = await Register.findOne({ email: email });
  
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
  
        if (isValidPassword) {
          const token = JWT.sign({ email: email },TokenKey, { expiresIn: "1d" });
          res.cookie("userToken", token);
          res.send({ token: token, fullname: user.fullname });
        } else {
          res.status(401).send("Enter correct password");
        }
      } else {
        res.status(404).send("Email does not exist; please register first!");
      }
    } catch (error) {
      console.error(`Error at: ${error}`);
      res.status(500).send("Internal Server Error");
    }
  };

export{userLogin, RegisterUser}