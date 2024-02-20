import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AuthDrawer from "./AuthDrawer";
import { useNavigate } from "react-router-dom";


const NavLink = (props) => {
  const { children, link } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("#61dafb"),
      }}
      href={link}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authType, setAuthType] = useState(0);
  const navigate = useNavigate();
  const { isLogin, isAuthDrawerOpen, setIsAuthDrawerOpen, setIsLogin } =
    useAuth();
const Links = isLogin?[{name: "Careers", route: "careers"}]:[];

  const handleLogout = () => {
    setIsLogin(false);
    navigate("/");
    sessionStorage.clear();
  };
  return (
    <>
      <Box borderBottom="1px solid #61dafb" width="100vw" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>TCN</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link} link={link.route}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isLogin ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      ""
                    }
                
                  />
                </MenuButton>
                <MenuList color="black">
                  <MenuItem onClick={()=>navigate("/user")}> Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Box display="flex" flexDirection="row" gap="5px">
                <Box
                  cursor="pointer"
                  onClick={() => {
                    setIsAuthDrawerOpen(true);
                    setAuthType(0);
                  }}
                >
                  Login{" "}
                </Box>
                |{" "}
                <Box
                  cursor="pointer"
                  onClick={() => {
                    setIsAuthDrawerOpen(true);
                    setAuthType(1);
                  }}
                >
                  Register
                </Box>
              </Box>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} link={link.route}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        <AuthDrawer
          isOpen={isAuthDrawerOpen}
          onClose={() => setIsAuthDrawerOpen(false)}
          authType={authType}
        />
      </Box>
    </>
  );
}
