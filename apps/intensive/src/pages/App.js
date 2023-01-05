import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"

const App = () => {
  return (
    <>
    <Flex flexDir='column' w='100%' h='100vh'>
      <Nav />
      <Outlet />
    </Flex>
    </>
  )
}

export default App 