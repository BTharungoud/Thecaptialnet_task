import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [usermail, setUsermail] = useState("");
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [onpageload, setOnpageload] = useState(false)
  const toast = useToast();

  useEffect(() => {
    const mail = sessionStorage.email;
    if (mail != usermail) setUsermail(mail);
    if(mail)setIsLogin(true);
  }, [usermail]);

  const values = {
    isLogin,
    setIsLogin,
    usermail,
    setUsermail,
    onpageload,
    setOnpageload,
    isAuthDrawerOpen,
    setIsAuthDrawerOpen,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
