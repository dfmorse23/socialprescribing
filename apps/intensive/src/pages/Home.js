import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <>
      <Box w={"100%"} h={"100vh"}>
        {/* Box holding Image and text */}
        <Box pos={"relative"} w={"100%"} h={"400px"}>
          <Image
            src={require("../images/bg.jpg")}
            h={"100%"}
            w={"100%"}
            fit={"cover"}
            filter="auto"
            brightness="60%"
          />
          {/* Text On top of Image, using absolute and top and left to position it along with translate */}
          <Heading
            color="white"
            position="absolute"
            top="35%"
            left="50%"
            /* Moving the text to the center of the image. */
            transform="translate(-50%, -50%)"
            fontSize={"64"}
            fontWeight={600}
            w={"100%"}
            textAlign="center"
          >
            Find a Social Prescription
          </Heading>
          <Text
            textAlign={"center"}
            fontSize={"15px"}
            color="white"
            position="absolute"
            top="55%"
            left="50%"
            px={10}
            transform="translate(-50%, -50%)"
            fontWeight={600}
          >
            Take control of your wellness by finding local resources and
            community activities that can help you thrive. Search 100+ curated
            links and resources for social prescriptions in your neighbourhood.
          </Text>
        </Box>
      </Box>
    </>
  );
};
export default Home;
