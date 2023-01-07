import { Center, Flex, Text } from "@chakra-ui/react";
import EmptyState from "./EmptyState";
import Loading from "./Loading";

const Events = ({ eventsData, isLoading, isError }) => {
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
          <></>
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
