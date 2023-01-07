import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Search, MapPin } from "react-feather";

const SearchBar = ({handleSearch}) => {
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    if (!isNaN(e.target.value)) {
      setError("");
      setZipCode(e.target.value);
    }
  };
  return (
    <>
      <Flex
        w={["300px", "600px", "600px", "600px"]}
        h={"45px"}
        align={"center"}
        flexDir="column"
        
      >
        <form style={{width: '100%'}} onSubmit={(e) => handleSearch(e, zipCode)}>
        <InputGroup rounded={20} shadow={"2xl"}>
          <InputLeftElement pointerEvents={"none"}>
            <Icon as={MapPin} w={25} h={25} color="#B2B6C6" />
          </InputLeftElement>
          <Input
            placeholder="Enter Zip Code"
            variant="outline"
            bg="white"
            h={"45px"}
            value={zipCode}
            onChange={onChange}
          />
          <InputRightElement>
            <Icon
              _hover={{ color: "primary", cursor: "pointer" }}
              as={Search}
              w={25}
              h={25}
              color="#B2B6C6"
              onClick={() => handleSearch(null, zipCode)}
            />
          </InputRightElement>
        </InputGroup>
        </form>
        {error && (
          <Text fontWeight={"500"} color="red.500">
            {error}
          </Text>
        )}
      </Flex>
    </>
  );
};
export default SearchBar;
