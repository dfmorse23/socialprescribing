import { Box, Heading, Text, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetEvents } from "../api";
import Events from "../components/Events";
import Filters from "../components/Filters";
import Search from "../components/SearchBar";

const Home = () => {
  const toast = useToast();
  const [filter, setFilter] = useState(["All"]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { mutate, isLoading, isError, data: eventsData } = useGetEvents({});
  
  /* 
    This is a useEffect hook that is used to filter the events based 
    on the filter selected. It uses the tag property of the event.
  */
  useEffect(() => {
    if (eventsData && eventsData.data) {
      if (filter[0] === "All") {
        setFilteredEvents([...eventsData.data]);
      } else {
        let filtered = [];
        for (let i = 0; i < filter.length; i++) {
          for (let j = 0; j < eventsData.data.length; j++) {
            if (filter[i] === eventsData.data[j].tag) {
              filtered.push(eventsData.data[j]);
            }
          }
        }
        setFilteredEvents([...filtered]);
      }
    }
  }, [filter, eventsData]);

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
        <Filters filter={filter} setFilter={setFilter} />
        <Events
          filter={filter}
          eventsData={filteredEvents}
          isLoading={isLoading}
          isError={isError}
        />
      </Box>
    </>
  );
};
export default Home;
