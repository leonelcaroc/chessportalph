import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const AdminLogin = () => {
  const [show, setShow] = useState(false);

  return (
    <Flex
      minHeight="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundImage="https://images.unsplash.com/photo-1585038021831-8afd9f9ab27f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    >
      <Flex
        flexDir="column"
        gap="1rem"
        border="1px solid gray"
        borderRadius="10px"
        padding="2rem"
        background="transparent"
        backdropFilter="blur(10px)"
      >
        <Text
          textAlign="center"
          fontWeight="bold"
          marginBlock="1rem"
          color="#fff"
          fontSize="1.3rem"
        >
          Admin Login
        </Text>
        <Flex flexDir="column" gap="1rem">
          <Input
            color="#fff"
            type="email"
            placeholder="Email"
            _focusVisible={{ borderColor: "none", boxShadow: "none" }}
          />
          <InputGroup>
            <Input
              color="#fff"
              type={show ? "text" : "password"}
              placeholder="Password"
              borderRight="none"
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
            />
            <InputRightAddon bgColor="transparent" borderLeft="none">
              {show ? (
                <IoEye
                  size="1.5rem"
                  cursor="pointer"
                  onClick={() => setShow(false)}
                  color="#F7FAFC"
                />
              ) : (
                <IoEyeOff
                  size="1.5rem"
                  cursor="pointer"
                  onClick={() => setShow(true)}
                  color="#F7FAFC"
                />
              )}
            </InputRightAddon>
          </InputGroup>
        </Flex>
        <Text
          fontSize="0.8rem"
          color="#fff"
          _hover={{ textDecoration: "underline", cursor: "pointer" }}
          width="fit-content"
        >
          Forgot Password?
        </Text>
        <Button
          bgColor="blue.100"
          _hover={{ bgColor: "blue.800", color: "#fff" }}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminLogin;
