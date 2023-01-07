import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Heart, ArrowUpRight } from "react-feather";
import EventModal from "./EventModal";

const EventCard = ({ event, imageSeed }) => {
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            alt={"Blog Image"}
            shadow={"md"}
            borderRadius={2}
          />
        </Box>
        <Box p={4}>
          {/* Tag on card aka "Mental Health" -------------------*/}
          <Box
            bg="#F3F4F6"
            display={"inline-block"}
            px={2}
            py={1}
            color="gray.10"
            mb={2}
            borderRadius={5}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {event.tag}
            </Text>
          </Box>
          {/* Title  -------------------*/}

          <Heading fontSize={"md"} noOfLines={2} color={"text"}>
            {event.title}
          </Heading>
        </Box>
        {/* Bottom of card ------------------- */}
        <HStack color="black">
          {/* Button to open up modal for more information */}
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
            _hover={{ color: "primary" }}
            onClick={() => setIsModalOpen(true)}
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              View more
            </Text>
            <ArrowUpRight />
          </Flex>
          {/* Like Button ------------------- */}
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
            _hover={{ color: "primary" }}
          >
            {liked ? (
              <Icon as={Heart} fill="red" color={"red"} fontSize={"24px"} />
            ) : (
              <Icon as={Heart} fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
};
export default EventCard;
