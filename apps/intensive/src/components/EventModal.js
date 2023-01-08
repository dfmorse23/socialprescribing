import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import {  ExternalLink } from "react-feather";

const EventModal = ({ isOpen, onClose, event: { title, tag, location } }) => {
  return (
    // Title, Description, Name, Tag, Website, Location,
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              {/* <Text>{tag}</Text> */}
              {/* <Text>{location}</Text> */}
            </Flex>
          </ModalBody>
          <ModalFooter
            // bg={"red"}
            justifyContent={"space-between"}
          >
            <Flex
              // bg="red"
              bg="#F3F4F6"
              borderRadius={5}
              justifyContent="center"
              alignSelf={"center"}
              // p={1}
              p={2}
            >
              <Icon as={ExternalLink} size={15} color="gray.20" />
            </Flex>
            {/* <Box
              bg="#F3F4F6"
              display={"inline-block"}
              px={2}
              py={1}
              color="gray.30"
              mb={2}
              borderRadius={5}
            >
              <Text fontSize={"xs"} fontWeight="medium">
                {tag}
              </Text>
            </Box> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EventModal;
