import { Box, Heading, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";
import Search from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <Box w={"100%"} h={"100vh"} bg="gray.200">
        {/* Box holding Image and text */}
        <Box w={"100%"} h={"400px"}>
          {/* Turn this flex into an image */}

          <Flex
            bgImage={require("../images/bg.jpg")}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            h={"100%"}
            w={"100%"}
            fit={"fit"}
            filter="auto"
            flexDir={"column"}
            justify={"center"}
            align={"center"}
          >
            {/* Text On top of Image, using absolute and top and left to position it along with translate */}
            <Heading
              color="white"
              fontSize={"64"}
              fontWeight={600}
              w={"60%"}
              textAlign="center"
              justifyContent={"center"}
            >
              Find a Social Prescription
            </Heading>
            <Text
              textAlign={"center"}
              fontSize={"15px"}
              color="white"
              w="45%"
              fontWeight={600}
              pt={5}
            >
              Take control of your wellness by finding local resources and
              community activities that can help you thrive. Search 100+ curated
              links and resources for social prescriptions in your
              neighbourhood.
            </Text>
          </Flex>
        </Box>
        <Flex pos="absolute" top="59%" left="30%">
          <Search />
        </Flex>
      </Box>
    </>
  );
};
export default Home;
