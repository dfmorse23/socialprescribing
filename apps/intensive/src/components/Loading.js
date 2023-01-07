import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <Flex>
        <Heading>Loading{" "}</Heading>
        <ScaleLoader color={'black'} />
      </Flex>
    </>
  );
};

export default Loading;
