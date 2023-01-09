import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  HStack,
} from "@chakra-ui/react";
import { ArrowUpRight } from "react-feather";

const EventCard = ({ event, imageSeed, openModal, index, cacheKey }) => {
  
  //WARNING: EXPERIMENTAL CODE:
  //This is for the favorites feature. It is not working yet (fully)

  // const { mutate: addFavorite, isLoading: addFavoriteLoading } =
  //   useAddFavorite(setLiked);

  // const { mutate: removeFavorite, isLoading: removeFavoriteLoading } =
  //   useRemoveFavorite(setLiked);

  // const handleFavorite = () => {
  //   if (!liked) {
  //     addFavorite({
  //       title: event.title,
  //       url: event.url,
  //       date: JSON.stringify(event.date),
  //       tag: event.tag,
  //       location: JSON.stringify(event.location),
  //       index,
  //       cacheKey,
  //     });
  //   } else {
  //     removeFavorite({
  //       favoriteId: liked,
  //       index,
  //       cacheKey,
  //     });
  //   }
  // };

  // END OF EXPERIMENTAL CODE

  return (
    <Center py={6}>
      <Box
        w={{ base: 320, sm: 300, md: 250, lg: 300 }}
        rounded={"sm"}
        overflow={"hidden"}
        bg="white"
        borderColor="gray.10"
      >
        <Box h={"180px"}>
          <Img
            src={
              event.image
                ? event.image
                : `https://picsum.photos/seed/${imageSeed}/2000/2000`
            }
            roundedTop={"sm"}
            objectFit="cover"
            h="100%"
            w="100%"
            alt={"Event Image"}
            shadow={"md"}
            borderRadius={2}
          />
        </Box>
        <Box pt={4}>
          {/* Tag on card aka "Mental Health" -------------------*/}
          <Box
            bg="#F3F4F6"
            display={"inline-block"}
            px={2}
            py={1}
            color="text"
            mb={2}
            borderRadius={5}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {event.tag}
            </Text>
          </Box>
          <Heading fontSize={"md"} noOfLines={2} color={"text"}>
            {event.title}
          </Heading>
        </Box>
        <HStack color="black">
          <Flex
            mt={4}
            // p={2}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
            _hover={{ color: "primary" }}
            onClick={() => openModal(event)}
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              View more
            </Text>
            <ArrowUpRight />
          </Flex>
          {/* 
          WARNING: EXPERIMENTAL CODE:
          This is for the favorites feature. It is not working yet (fully)
    

          {user && (
            <>
              {addFavoriteLoading || removeFavoriteLoading ? (
                <MoonLoader size={24} color="gray" />
              ) : (
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  cursor="pointer"
                  _hover={{ color: "primary" }}
                  onClick={handleFavorite}
                >
                  <Icon
                    as={Heart}
                    color={liked ? "red.500" : "black"}
                    fontSize={"24px"}
                  />
                </Flex>
              )}
            </>
          )} */}
        </HStack>
      </Box>
    </Center>
  );
};
export default EventCard;
