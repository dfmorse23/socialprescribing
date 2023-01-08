import { Box, Heading, Text, Flex,  useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetEvents } from "../api";
import Events from "../components/Events";
import Search from "../components/SearchBar";

const Home = () => {
  const toast = useToast();
  // const [events, setEvents] = useState([]);
  //getEvents mutation
  const {
    mutate,
    isLoading,
    isError,
    data: eventsData,
  } = useGetEvents();

 
  //gets events using the zip code
  const handleSearch = (e, zipCode) => {
    if (e) {
      // Prevents page from reloading
      e.preventDefault();
    }
    if (zipCode.length !== 5) {
      toast({
        title: "Invalid Zip Code",
        description: "Please enter a valid zip code",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      mutate(zipCode);
    }
  };
  return (
    <>
      <Box w={"100%"} h={"100%"} bg="white">
        {/* Box holding Image and text */}

        <Box w={"100%"} h={"450px"}>
          {/* Image Flex*/}

          <Flex
            // Settings for the image
            bgImage={require("../assets/images/bg.jpg")}
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
              w={["100%", "60%", "60%", "60%"]}
              textAlign="center"
              justifyContent={"center"}
              zIndex={5}
            >
              Find a Social Prescription
            </Heading>
            <Text
              textAlign={"center"}
              fontSize={["12px", "15px", "15px", "15px"]}
              color="white"
              w={["80%", "45%", "45%", "45%"]}
              fontWeight={600}
              pt={5}
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
            <Search handleSearch={handleSearch} />
          </Flex>
        </Box>
        <Events eventsData={eventsData} isLoading={isLoading} isError={isError} />
      </Box>
    </>
  );
};
export default Home;
