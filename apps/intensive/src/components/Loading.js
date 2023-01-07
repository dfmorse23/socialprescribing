import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <Flex>
        {/* <h1>Loading</h1> */}
        <Heading>Loading{" "}</Heading>
        <ScaleLoader color={'black'} />
      </Flex>
    </>
  );
};

export default Loading;
