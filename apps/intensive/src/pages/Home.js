import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import React from "react";
import Footer from "../components/Footer";
import Search from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <Box w={"100%"} h={"100vh"} bg="white">

        {/* Box holding Image and text */}

        <Box w={"100%"} h={"450px"}>
          {/* Image Flex*/}

          <Flex
            // Settings for the image
            bgImage={require("../images/bg.jpg")}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            // Settings for the text
            h={"100%"}
            w={"100%"}
            flexDir={"column"}
            justify={"center"}
            align={"center"}
            zIndex={-5}
          >
            <Heading
              color="white"
              fontSize={["25px", "30px", "45px", "64px"]}
              fontWeight={600}
              w={["100%", "60%", "60%", ["100%", "60%", "60%", "60%"]]}
              textAlign="center"
              justifyContent={"center"}
              zIndex={5}
              zIndex={5}
            >
              Find a Social Prescription
            </Heading>
            <Text
              textAlign={"center"}
              fontSize={["10px", "15px", ["10px", "15px", "15px", "15px"], "15px"]}
              color="white"
              w={["80%", {["80%", "45%", "45%", "45%"]}, "45%", "45%"]}
              fontWeight={600}
              pt={5}
              zIndex={5}
              zIndex={5}
            >
              Take control of your wellness by finding local resources and
              community activities that can help you thrive. Search 100+ curated
              links and resources for social prescriptions in your
              neighbourhood.
            </Text>
          </Flex>

          {/* Search Bar */}

          <Flex justify={"center"} mt="-6">
            <Search />
          </Flex>
        </Box>

      </Box>
      <Footer />
    </>
  );
};
export default Home;