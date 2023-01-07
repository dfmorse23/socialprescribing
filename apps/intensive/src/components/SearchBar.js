import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, {  useState } from "react";
import { Search, MapPin } from "react-feather";

const SearchBar = () => {
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

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
        flexDir='column'
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
            value={zipCode}
            onChange={onChange}
          />
          <InputRightElement>
              <Search size={20} color={"#7F85A0"} />
          </InputRightElement>
        </InputGroup>
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
