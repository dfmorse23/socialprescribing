import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const App = () => {
  return (
    <>
      <Flex
        justify={"space-between"}
        flexDir="column"
        w="100%"
        h={"auto"}
        minH="100vh"
      >
        <Nav />
        <Outlet />
        <Footer />
      </Flex>
    </>
  );
};

export default App;
