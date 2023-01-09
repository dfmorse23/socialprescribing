import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <Flex flexDir={"column"} justify="center" align={"center"}>
        <Heading color="text">Loading </Heading>
        <ScaleLoader color={"black"} />
      </Flex>
    </>
  );
};

export default Loading;
