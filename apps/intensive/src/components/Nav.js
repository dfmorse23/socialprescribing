import { Box, Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { ReactComponent as MainLogo } from "../images/logo.svg";
import React from "react";

const Nav = () => {
  return (
    <Flex p="5" w={"100%"} justify="space-around">
      <Flex>
        <MainLogo />
        <Heading size={"md"} paddingLeft={2} fontWeight>
          social prescribing usa
        </Heading>
      </Flex>
      <Flex>
        <ButtonGroup>
          <Button size={"s"} variant={"link"} color="Text">
            Home
          </Button>
          <Button size={"s"} variant={"link"} color="Text">
            Find
          </Button>
          <Button size={"s"} variant={"link"} color="Text">
            About
          </Button>
          <Button size={"s"} bg="primary" color={"white"} p={2}>
            Login
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
export default Nav;
