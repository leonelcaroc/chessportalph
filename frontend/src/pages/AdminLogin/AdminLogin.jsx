import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useQuery, useMutation, useQueryClient } from "react-query";
import AdminService from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../store/store";

const AdminLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setCredentials } = useAdminStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const loginMutation = useMutation(AdminService.loginAdmin, {
    onSuccess: (data) => {
      toast({
        title: "Login",
        description: data.message,
        status: data.status,
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setCredentials(data.adminInfo);

      navigate("/admin");
    },
    onError: (error) => {
      toast({
        title: "Login",
        description: error.response.data.message || "Something went wrong.",
        status: error.response.data.status,
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      console.error("Error logging in:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      loginMutation.mutate(loginData);
    }, 1000);
  };

  return (
    <Flex
      minHeight="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundImage="https://res.cloudinary.com/db5qufd8v/image/upload/v1726756244/bg_chess_portal_adminlogin_j6bbb5.avif"
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
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleChange}
            _focusVisible={{ borderColor: "none", boxShadow: "none" }}
          />
          <InputGroup>
            <Input
              color="#fff"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
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
          onClick={handleLogin}
          isLoading={isLoggingIn}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminLogin;
