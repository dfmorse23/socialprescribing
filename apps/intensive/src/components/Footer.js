import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <>
      <Flex
        w="100%"
        h="60px"
        justify={"center"}
        align={"center"}
        color="gray.30"
        bg={"#F3F4F6"}

      >
        <Text fontSize={"12px"}>ⓒ 2022 Social Prescribing USA. All rights reserved.</Text>
      </Flex>
    </>
  );
};
export default Footer;
