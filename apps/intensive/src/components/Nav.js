import { Button, ButtonGroup, Flex, Heading, Link } from "@chakra-ui/react";
import { ReactComponent as MainLogo } from "../assets/images/logo.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();

  return (
    <Flex
      p={[5, 10, 10, 6]}
      w={["100%", "100%", "100%", "100%"]}
      justify="space-between"
    >
      {/* Logo and Title Text -------------------------- */}
      <Flex align="center">
        {/* Logo SVG */}
        <MainLogo />
        <Heading
          fontSize={["15px", "24px", "24px", "24px"]}
          fontWeight={600}
          paddingLeft={[1, 2, 2, 2]}
          color={"text"}
        >
          social prescribing usa.
        </Heading>
      </Flex>
      {/* Nav Buttons -------------------------- */}
      <Flex color={"Text"} fontSize={["12px", "12px", "12px", "15px"]}>
        <ButtonGroup size={"s"}>
          <Button variant={"link"} color={"text"} onClick={() => navigate("/")}>
            Find
          </Button>
          <Button
            as={Link}
            variant={"link"}
            color={"text"}
            href="https://socialprescribingusa.com/about.html"
            // make it so that the link opens in a new tab
            isExternal
          >
            About
          </Button>
          {/* Add when favorites is working */}
          {/* <Button
            onClick={() => navigate("/login")}
            bg="primary"
            color={"white"}
            p={2}
            _hover={{
              bg: "secondary",
            }}
          >
            Sign In
          </Button> */}
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
export default Nav;
