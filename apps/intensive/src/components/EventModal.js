import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Img,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Flex,
  Icon,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { ExternalLink, MapPin } from "react-feather";
import { motion } from "framer-motion";

const EventModal = ({
  isOpen,
  onClose,
  event: { title, tag, location, url, image },
}) => {
  return (
    // Title, Description, Name, Tag, Website, Location,
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent>
          <Flex h={"200px"} w={"100%"}>
            <Img
              src={image}
              roundedTop={"sm"}
              objectFit="cover"
              h="100%"
              w="100%"
              shadow={"sm"}
              alt='Event Image'
            />
          </Flex>
          <ModalHeader color={"text"}>{title}</ModalHeader>
          <ModalCloseButton
            bg="white"
            rounded={"full"}
            size="sm"
            _hover={{ bg: "#F3F4F6", color: "red" }}
          />
          <ModalBody>
            <Flex color={"gray.30"} mt={5} align="center">
              <Icon as={MapPin} w={"15px"} h={"15px"} color="#B2B6C6" />

              {/* I DONT KNOW WHY BUT REGION SHOWS THE CITY AND CITY SHOWS THE STATE DONT ASK ME WHY  */}
              <Text px={1}>{location.city},</Text>
              <Text px={1}>{location.region},</Text>
              <Text px={1}>{location.postalCode}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter
          // justifyContent={"space-between"}
          >
            <Box
              bg="#F3F4F6"
              display={"inline-block"}
              px={2}
              py={1}
              color="text"
              // mb={2}
              borderRadius={5}
            >
              <Text fontSize={"xs"} fontWeight="medium">
                {tag}
              </Text>
            </Box>
            <Flex justify={"end"} w="100%">
              {/* SITE --------------------------------- */}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  href={url}
                  isExternal
                  borderRadius={5}
                  bg="#F3F4F6"
                  // p={1}
                  pl={2}
                  pr={2}
                  pt={2}
                  pb={1}
                  _hover={{ cursor: "pointer" }}
                >
                  <Icon
                    as={ExternalLink}
                    color="gray.20"
                    _hover={{ color: "primary" }}
                  />
                </Link>
              </motion.div>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EventModal;
