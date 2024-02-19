import React from "react";
import { useForm } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { Button, Box, useToast } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const toast = useToast();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    toast({title:'Wait we are you registry.'})
    const registerdata = {
      fullname: data.Name,
      email: data.Email,
      password: data.Password,
    };
    console.log(data);
    const response = await fetch(
      "https://job-board-server-eo10.onrender.com/login/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerdata),
      }
    );
    const responseBody = await response.text();
    const userdata = {
      fullname: data.Name,
      email: data.Email,
    };
    const signupuser = await fetch(
      "https://job-board-server-eo10.onrender.com/profile/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      }
    );
    const signupdata = await signupuser.json();
    console.log(signupdata);
    console.log("Success:", responseBody);
    toast({ description: `Fetch resolved ${responseBody}` });

    reset();
  };
  return (
    <Box
      width="500px"
      display="flex"
      flexDirection="column"
      backgroundColor="#28c34"
      gap="16px"
      justifyContent="center"
      alignItems="center"
    >
      {" "}
      <CustomTextField
        name="Name"
        label="Name"
        control={control}
        type="text"
        placeholder="Name"
        error={errors.Name}
        rules={{
          required: "Name is required",
        }}
      />
      <CustomTextField
        name="Email"
        label="Email"
        control={control}
        type="text"
        placeholder="johndoe@mail.com"
        error={errors.Email}
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
        name="Password"
        label="Password"
        control={control}
        type="password"
        placeholder="Password"
        error={errors.Password}
        rules={{
          required: "Password is required",
          validate: (value) => {
            const password = /^(?=.*\d)(?=.*[!@#$%^&*]).*$/;
            if (!password.test(value)) {
              return "Password should contain at least 1 special char";
            }
          },
        }}
      />
      <Button
        width="250px"
        colorScheme="blue"
        borderRadius="8px"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
