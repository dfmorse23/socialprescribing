import { Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { filters } from "../utils/filter";
const Filters = ({ filter, setFilter }) => {
  return (
    <>
      <Wrap justify='center' mt={10} p={{ base: 4, md: 5 }}>
        <WrapItem>
          <Flex
            alignSelf={"center"}
            h={{ base: 25, md: 35 }}
            fontSize={"md"}
            p={5}
            cursor="pointer"
            bg={filter.includes("All") ? "primary" : "gray.200"}
            color={filter.includes("All") ? "white" : "gray.30"}
            fontWeight="bold"
            justify="center"
            rounded="full"
            _hover={{ bg: "primary", color: "white" }}
            alignItems="center"
            onClick={() => {
              setFilter(["All"]);
            }}
          >
            {filters[0]}
          </Flex>
        </WrapItem>
        {filters.slice(1).map((f, index) => (
          <WrapItem key={index}>
            <Flex
              alignSelf={"center"}
              h={{ base: 25, md: 35 }}
              fontSize={"md"}
              p={5}
              cursor="pointer"
              onClick={() => {
                if (filter.includes(f) && filter.length > 1) {
                  console.log("removing");
                  setFilter(filter.filter((item) => item !== f));
                } else if (filter[0] === "All") {
                  console.log("All");
                  setFilter([f]);
                } else if (filter.length === 1 && filter[0] === f) {
                  setFilter(["All"]);
                } else {
                  console.log("appending");
                  setFilter([f, ...filter]);
                }
              }}
              bg={filter.includes(f) ? "primary" : "gray.200"}
              color={filter.includes(f) ? "white" : "gray.30"}
              fontWeight="bold"
              justify="center"
              rounded="full"
              _hover={{ bg: "primary", color: "white" }}
              alignItems="center"
            >
              {f}
            </Flex>
          </WrapItem>
        ))}
      </Wrap>
      {/* <Grid
        templateColumns={{
          base: "repeat(auto-fit, minmax(100px, 1fr))",
          md: "repeat(auto-fit, minmax(120px, 1fr))",
        }}
        autoRows={"inherit"}
        mt={10}
        rowGap={2}
        columnGap={8}
        p={{ base: 4, md: 5 }}
        alignSelf={"center"}
      >
        <GridItem>
          <Center>
            <Flex
              alignSelf={"center"}
              h={{ base: 25, md: 35 }}
              fontSize={"md"}
              p={5}
              cursor="pointer"
              bg={filter.includes("All") ? "primary" : "gray.200"}
              color={filter.includes("All") ? "white" : "gray.30"}
              fontWeight="bold"
              justify="center"
              rounded="full"
              _hover={{ bg: "primary", color: "white" }}
              alignItems="center"
              onClick={() => {
                setFilter(["All"]);
              }}
            >
              {filters[0]}
            </Flex>
          </Center>
        </GridItem>
        {filters.slice(1).map((f, index) => (
          <GridItem key={index}>
            <Center>
              <Flex
                alignSelf={"center"}
                h={{ base: 25, md: 35 }}
                fontSize={"md"}
                p={5}
                cursor="pointer"
                onClick={() => {
                  if (filter.includes(f) && filter.length > 1) {
                    console.log("removing");
                    setFilter(filter.filter((item) => item !== f));
                  } else if (filter[0] === "All") {
                    console.log("All");
                    setFilter([f]);
                  } else if (filter.length === 1 && filter[0] === f) {
                    setFilter(["All"]);
                  } else {
                    console.log("appending");
                    setFilter([f, ...filter]);
                  }
                }}
                bg={filter.includes(f) ? "primary" : "gray.200"}
                color={filter.includes(f) ? "white" : "gray.30"}
                fontWeight="bold"
                justify="center"
                rounded="full"
                _hover={{ bg: "primary", color: "white" }}
                alignItems="center"
              >
                {f}
              </Flex>
            </Center>
          </GridItem>
        ))}
      </Grid> */}
    </>
  );
};

export default Filters;
