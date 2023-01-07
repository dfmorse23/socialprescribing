import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { ReactComponent as MainLogo } from "../images/logo.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();

  return (
    <Flex
      p={[5, 10, 10, 10]}
      w={["100%", "100%", "100%", "100%"]}
      justify={["none", "space-around", "space-around", "space-around"]}
      // bg="red"
    >
      {/* Logo and Title Text -------------------------- */}
      <Flex align="center">
        {/* Logo SVG */}
        <MainLogo />
        <Heading
          fontSize={["15px", "24px", "24px", "24px"]}
          fontWeight={600}
          paddingLeft={2}
          color={"text"}
        >
          social prescribing usa.
        </Heading>
      </Flex>
      {/* Nav Buttons -------------------------- */}
      <Flex color={"Text"} fontSize={["12px"]} ml={2}>
        <ButtonGroup size={"s"} fontWeight={""}>
          <Button
            variant={"link"}
            color={"text"}
            onClick={() => navigate("/")}
          >
            Find
          </Button>
          <Button variant={"link"} color={"text"}>
            About
          </Button>
          <Button
            onClick={() => navigate("/login")}
            bg="primary"
            color={"white"}
            p={2}
            // mt={'1'}
            // mb={'1'}
          >
            Sign In
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
export default Nav;
