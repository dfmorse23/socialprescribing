import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Icon,
} from "@chakra-ui/react";
// import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { Heart, ArrowUpRight } from "react-feather";

const EventCard = () => {
  const [liked, setLiked] = useState(false);

  return (
    <Center py={6}>
      <Box
        w="s"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        // border={"1px"}
        borderColor="gray.10"
        // boxShadow={useColorModeValue("6px 6px 0 #4361EE", "6px 6px 0 cyan")}
        // shadow={"md"}
      >
        <Box
          h={"180px"}
          // borderBottom={"1px"}
          // borderColor="black"
        >
          <Img
            src={
              "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            }
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Blog Image"}
            shadow={"md"}
            borderRadius={2}
          />
        </Box>
        <Box p={4}>
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
              Tag
            </Text>
          </Box>
          <Heading fontSize={"2xl"} noOfLines={1} color={"text"}>
            Title
          </Heading>
          <Text color={"text"} noOfLines={2}>
            Description
          </Text>
        </Box>
        <HStack
          // borderTop={"1px"}
          color="black"
        >
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              View more
            </Text>
            <ArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            // borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
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
