import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import React from "react";
import logo from "../logo.svg";

const Header = ({ children }) => {
  return (
    <Box
      aria-label="Header"
      px="8rem"
      py="2rem"
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <HStack display={"flex"}>
        <Image src={logo} width="2rem" />
        <Heading fontSize="2xl">Disfo</Heading>
      </HStack>
      {children}
    </Box>
  );
};

export default Header;
