import {
  Button,
  Drawer,
  Box,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useRef } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthDrawer({ isOpen, onClose, authType }) {
  const btnRef = useRef();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            defaultIndex={authType}
          >
            <DrawerHeader>
              <TabList>
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Register</Tab>
              </TabList>
            </DrawerHeader>
            <DrawerBody
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TabPanels>
                <TabPanel>
                  <LoginForm />
                </TabPanel>
                <TabPanel>
                  <RegisterForm />
                </TabPanel>
              </TabPanels>
            </DrawerBody>
          </Tabs>
        </DrawerContent>
      </Drawer>
    </>
  );
}
