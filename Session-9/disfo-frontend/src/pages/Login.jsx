import {
  Box,
  Button,
  Center,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { SERVER } from "../App";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setForm({ ...form, [key]: value });
  };

  const handleLoginSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(`${SERVER}/auth/login`, form, {withCredentials: true});
      if (result.status === 200) {
        setIsLoading(false);
        localStorage.setItem('userId', result.data.userId);
        toast({
          title: "User Logged In!",
          description: `Username - ${form.username}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      if (error) {
        console.log(error);
        toast({
          title: "Error Occured!",
          description: `${error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div>
      <Header>
        <Link to="/">
          <Button colorScheme="teal" variant={"outline"}>
            Signup
          </Button>
        </Link>
      </Header>
      <Center w="100%" height={"50vh"}>
        <Box width="26rem" borderRadius={"10px"} shadow={"xl"} padding={"2rem"}>
          <VStack spacing={4}>
            <Text fontSize={"1.5rem"} fontWeight={"bold"} color="teal">
              Welcome back 👋🏼
            </Text>
            <Box w="100%">
              <Text mb="1">Username</Text>
              <Input
                name="username"
                type="text"
                value={form.username}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Box>
            <Box w="100%">
              <Text mb="1">Password</Text>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Box>
            <Button
              colorScheme={"teal"}
              onClick={handleLoginSubmit}
              isLoading={isLoading}
              loadingText="Logging In"
            >
              Login
            </Button>
          </VStack>
        </Box>
      </Center>
    </div>
  );
};

export default Login;
