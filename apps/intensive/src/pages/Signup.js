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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setValidationError("Passwords do not match");
    } else if (password.length < 6) {
      return setValidationError("Password must be at least 6 characters");
    } else if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      return setValidationError("Please fill out all fields");
    } else {
    setLoading(true)
      setValidationError("");
      await axios
        .post(`${API_URL}/v2/auth/signup`, { name, email, password })
        .then((res) => {
          setLoading(false)
          if (res.data.success) {
            window.location.href = '/'
          } else {
            setValidationError(res.data.message);
          }
        });
    }
  };

  if (loadingUser) return null;

  return (
    <>
      <Flex w="100%" h="100%" p={5}>
        <Center w="100%" h="100%">
          <Flex
            flexDir={"column"}
            rounded={5}
            boxShadow={"2xl"}
            w={{ base: "100%", sm: 500 }}
            minH="100%"
            h="auto"
            p={10}
          >
            <form style={{ height: "100%" }} onSubmit={handleSubmit}>
              <Flex h="100%" flexDir={"column"} justify="space-between">
                <VStack spacing={15}>
                  <Text fontWeight={"500"}>Welcome,</Text>
                  <Heading as="h3" fontSize="2xl">
                    Create an account
                  </Heading>
                </VStack>
                <VStack mt={5} w="100%" spacing={30}>
                  <VStack w="100%">
                    <Heading alignSelf={"start"} fontSize={15} color="gray">
                      Full Name *
                    </Heading>
                    <Input
                      mt={2}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </VStack>
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
                  </VStack>
                  <VStack w="100%">
                    <Heading alignSelf={"start"} fontSize={15} color="gray">
                      Confirm Password *
                    </Heading>
                    <Input
                      type="password"
                      mt={2}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {validationError && (
                      <Text fontWeight={"500"} color="red.500">
                        {validationError}
                      </Text>
                    )}
                  </VStack>
                </VStack>
                <VStack mt={5} spacing={3}>
                  <Button
                    isLoading={loading}
                    type="submit"
                    _hover={{ color: "gray.800", bg: "gray.200" }}
                    color="white"
                    mt={5}
                    bg="primary"
                    w="100%"
                  >
                    Signup
                  </Button>
                  <Text alignSelf={"start"} fontWeight="600">
                    Already an account?{" "}
                    <Link color="primary" as={RouterLink} to="/login">
                      Login
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

export default Signup;
