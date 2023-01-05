import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoadingUser(false);
      navigate("/");
    } else {
      setLoadingUser(false);
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setValidationError("Please fill out all fields.");
        return;
      } else {
        setValidationError("");
        setLoading(true);
        await axios
          .post(`${API_URL}/v2/auth/login`, { email, password })
          .then((res) => {
            if (res.data.success) {
              window.location.href = "/";
            } else {
              setValidationError(res.data.message);
            }
          });
      }
    } catch (err) {
      console.log(err);
      setValidationError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  if (loadingUser) return null
  return (
    <>
      <Flex w="100%" h="100%" p={5}>
        <Center w="100%" h="100%">
          <Flex
            flexDir={"column"}
            rounded={5}
            boxShadow={"2xl"}
            w={{ base: "100%", sm: 500 }}
            h="100%"
            p={10}
          >
            <form style={{ height: "100%" }} onSubmit={handleLogin}>
              <Flex h="100%" flexDir={"column"} justify="space-between">
                <VStack spacing={15}>
                  <Text fontWeight={"500"}>Welcome Back</Text>
                  <Heading as="h3" fontSize="2xl">
                    Login to your account
                  </Heading>
                </VStack>
                <VStack w="100%" spacing={30}>
                  <VStack w="100%">
                    <Heading alignSelf={"start"} fontSize={15} color="gray">
                      Email *
                    </Heading>
                    <Input
                      mt={2}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </VStack>
                  <VStack w="100%">
                    <Heading alignSelf={"start"} fontSize={15} color="gray">
                      Password *
                    </Heading>
                    <Input
                      type="password"
                      mt={2}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {validationError && (
                      <Text fontWeight={"500"} color="red.500">
                        {validationError}
                      </Text>
                    )}
                  </VStack>
                </VStack>
                <VStack spacing={3}>
                  <Button
                    isLoading={loading}
                    type="submit"
                    _hover={{ color: "gray.800", bg: "gray.200" }}
                    color="white"
                    mt={5}
                    bg="primary"
                    w="100%"
                  >
                    Login
                  </Button>
                  <Text alignSelf={"start"} fontWeight="600">
                    Don't have an account?{" "}
                    <Link color="primary" as={RouterLink} to="/signup">
                      Join Today
                    </Link>
                  </Text>
                </VStack>
              </Flex>
            </form>
          </Flex>
        </Center>
      </Flex>
    </>
  );
};

export default Login;
