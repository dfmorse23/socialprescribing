import { Center, Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import EventCard from "./EventCard";
import EmptyState from "./EmptyState";
import Loading from "./Loading";
import { useEffect, useState } from "react";

const Events = ({ eventsData, isLoading, isError }) => {
  const [data, setData] = useState(eventsData);

  useEffect(() => {
    if (eventsData && eventsData.data) {
      console.log(eventsData.data[1]);
    }
  }, [eventsData]);

  if (isLoading)
    return (
      <Center mt={10} mb={10} w="100%" h="100%">
        <Loading />
      </Center>
    );
  if (isError) return <Text alignSelf={"center"}>An error has occurred</Text>;

  return (
    <>
      <Flex mt={10} h="100%">
        {eventsData && eventsData.data.length > 0 ? (
          <>
            <SimpleGrid
              w="100%"
              columns={{ base: 1, md: 2, lg: 3}}
              gap={10}
              mt={5}
            >
              {eventsData.data[0].EventBrite.map((event, index) => (
                <GridItem key={index}>
                  <Center>
                    <EventCard imageSeed={index + (Math.random() * 100)} event={event} />
                  </Center>
                </GridItem>
              ))}
              {eventsData.data[1].Volunteering.map((event, index) => (
                <GridItem key={index}>
                  <Center>
                    <EventCard imageSeed={index + (Math.random() * 100)} event={event} />
                  </Center>
                </GridItem>
              ))}
              {eventsData.data[2].Generic.map((event, index) => (
                <GridItem key={index}>
                  <Center>
                    <EventCard imageSeed={index + (Math.random() * 100)} event={event} />
                  </Center>
                </GridItem>
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Center h={"100%"} w={"100%"}>
            <EmptyState />
          </Center>
        )}
      </Flex>
    </>
  );
};

export default Events;
