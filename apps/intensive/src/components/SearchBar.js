import {
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
    <>
      <Flex
        w={["300px", "600px", "600px", "600px"]}
        h={"45px"}
        align={"center"}
      >
        <InputGroup shadow={"2xl"}>
          <InputLeftElement pointerEvents={"none"}>
            <MapPin size={20} color="#B2B6C6" />
          </InputLeftElement>
          <Input
            placeholder="Enter Zip Code or City"
            variant="outline"
            bg="white"
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
