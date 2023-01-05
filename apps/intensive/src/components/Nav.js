import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { ReactComponent as MainLogo } from "../images/logo.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  
  return (
    <Flex p={10} w={"100%"} justify="space-around">
      {/* Logo and Title Text -------------------------- */}
      <Flex align="center">
        {/* Logo SVG */}
        <MainLogo />
        <Heading
          fontSize={"24px"}
          fontWeight={600}
          paddingLeft={2}
          color={"text"}
        >
          social prescribing usa.
        </Heading>
      </Flex>
      {/* Nav Buttons -------------------------- */}
      <Flex color={"Text"}>
        <ButtonGroup size={"s"} fontWeight={""}>
          <Button variant={"link"} color={"text"}>
            Home
          </Button>
          <Button variant={"link"} color={"text"}>
            Find
          </Button>
          <Button  variant={"link"} color={"text"}>
            About
          </Button>
          <Button onClick={() => navigate('/login')} bg="primary" color={"white"} p={2}>
            Sign In
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
export default Nav;
