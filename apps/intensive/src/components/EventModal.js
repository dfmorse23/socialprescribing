import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Flex,
  Text,
  Box,
  Icon,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { Heart, ExternalLink } from "react-feather";
import { motion } from "framer-motion";

const EventModal = ({ isOpen, onClose, event: { title, tag, location, url } }) => {
  return (
    // Title, Description, Name, Tag, Website, Location,
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'text'}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              {/* <Text>{tag}</Text> */}
              {/* <Text>{location}</Text> */}
            </Flex>
          </ModalBody>
          <ModalFooter
          // justifyContent={"space-between"}
          >
            {/* HEART --------------------------------- */}
            <Flex justify={"start"} w="100%">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  borderRadius={5}
                  bg="#F3F4F6"
                  // p={1}
                  pl={2}
                  pr={2}
                  pt={2}
                  pb={1}
                  mr={2}
                  _hover={{ cursor: "pointer" }}
                >
                  <Icon
                    as={Heart}
                    color="gray.20"
                    _hover={{ color: "primary" }}
                  />
                </Link>
              </motion.div>
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
                {tag}
              </Text>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EventModal;
