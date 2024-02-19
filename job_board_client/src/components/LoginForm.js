import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, useToast } from "@chakra-ui/react";
import CustomTextField from "./CustomTextField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const LoginForm = () => {
  const { setUsermail, setIsLogin, setIsAuthDrawerOpen } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const registerdata = {
      email: data.email,
      password: data.password,
    };
    const response = await fetch(
      "https://job-board-server-eo10.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerdata),
      }
    );
    if (response.status !== (201 && 200)) {
      const responseBody = await response.text();
      toast({ status: "error", description: responseBody });
    } else {
      setUsermail(data.email);
      sessionStorage.setItem("email", data.email);
      const responseBody = await response.json();
      console.log("Success:", responseBody);
      toast({ status: "success", description: `Login sucessfull` });
      sessionStorage.setItem("Token", responseBody.token);
      sessionStorage.setItem("Name", responseBody.fullname);
      if(responseBody.fullname === "Admin"){
        navigate('/admin')
      }else{
          navigate("/careers");
          setIsAuthDrawerOpen(false);
          setIsLogin(true);
      }
    }

    reset();
  };
  return (
    <Box
      width="500px"
      display="flex"
      flexDirection="column"
      gap="16px"
      justifyContent="center"
      alignItems="center"
    >
      {" "}
      <CustomTextField
        name="email"
        label="Email"
        control={control}
        placeholder="Email"
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
        name="password"
        label="Password"
        control={control}
        type="password"
        placeholder="Enter password"
        error={errors.password}
        rules={{
          required: "Password is required",
          validate: (value) => {
            const password = /^(?=.*\d)(?=.*[!@#$%^&*]).*$/;
            if (!password.test(value)) {
              return "Password should contain at least 1 special char, number";
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
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
