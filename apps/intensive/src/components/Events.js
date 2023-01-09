import {
  Center,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import EventCard from "./EventCard";
import EmptyState from "./EmptyState";
import Loading from "./Loading";
import { useState } from "react";
import EventModal from "./EventModal";

const Events = ({ eventsData, isLoading, isError, filter }) => {
  const [event, setEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = (event) => {
    setEvent(event);
    onOpen();
  };

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
        {eventsData && eventsData.length > 0 ? (
          <>
            <SimpleGrid
              w="100%"
              columns={{ base: 1, md: 2, lg: 3 }}
              gap={10}
              mt={5}
            >
              {eventsData.map((event, index) => (
                <GridItem key={index}>
                  <Center>
                    <EventCard
                      openModal={openModal}
                      imageSeed={index + Math.random() * 100}
                      event={event}
                    />
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
      {event && (
        <EventModal
          isOpen={isOpen}
          onClose={onClose}
          event={event}
        />
      )}
    </>
  );
};

export default Events;
