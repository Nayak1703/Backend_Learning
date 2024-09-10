import {
  Box,
  Button,
  Center,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SERVER } from "../App";
import Header from "../components/Header";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const toast = useToast();

  const handleInputChange = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setForm({ ...form, [key]: value });
  };

  const handleSignupSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(`${SERVER}/auth/signup`, form);
      if (result.status === 200) {
        setIsLoading(false);
        toast({
          title: "New Account Created",
          description: `Email - ${form.email}`,
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
        <Link to="/login">
          <Button colorScheme="teal" variant={"outline"}>
            Login
          </Button>
        </Link>
      </Header>
      <Center w="100%" height={"50vh"}>
        <Box width="26rem" borderRadius={"10px"} shadow={"xl"} padding={"2rem"}>
          <VStack spacing={4}>
            <Text fontSize={"1.5rem"} fontWeight={"bold"} color="teal">
              Create new account 🤩
            </Text>
            <Box w="100%">
              <Text mb="1">Email</Text>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Box>
            <Box w="100%">
              <Text mb="1">Username</Text>
              <Input
                name="username"
                type="username"
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
              onClick={handleSignupSubmit}
              isLoading={isLoading}
              loadingText="Creating New Account"
            >
              Signup
            </Button>
          </VStack>
        </Box>
      </Center>
    </div>
  );
};

export default Signup;
