import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { Search, MapPin } from "react-feather";

const SearchBar = () => {
  return (
    // <Flex
    //   bg="white"
    //   h={"50px"}
    //   w={"677px"}
    //   borderRadius="8px"
    //   justify={"center"}
    //   // dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    //   boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    // >
    //   <h1>Search</h1>
    // </Flex>
    <>
      <Flex
        w="600px"
        h={"50px"}
        alignItems={"center"}
      >
        <InputGroup>
          <InputLeftElement pointerEvents={"none"}>
            <MapPin size={20} color="#B2B6C6" />
          </InputLeftElement>
          <Input
            placeholder="Enter Zip Code or City"
            variant="filled"
            h={"45px"}
          />
          <InputRightElement>
            <Search size={20} color={"#7F85A0"} />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </>
  );
};
export default SearchBar;
