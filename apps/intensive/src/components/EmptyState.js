import { Center, Text } from "@chakra-ui/react";
import { ReactComponent as Empty } from "../images/emptyStateImage.svg";

import React from "react";

const EmptyState = () => {
  return (
    <>
      <Center flexDir={'column'} >
        <Text fontSize={["20px"]} fontWeight={600} color={'gray.20'}>Discover local activities near you!</Text>
        <Empty />
      </Center>
    </>
  );
};
export default EmptyState;
