import React, { useEffect } from "react";
import {
  VStack,
  useColorMode,
  IconButton,
  Heading,
  Flex,
  Link,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { FaSun, FaMoon } from "react-icons/fa";
import Login from "./component/Login";
import Context from "./context/Init";
import Main from "./component/main/Main";
const App = () => {
  const [account, setAccount] = React.useState<string>("");
  //@ts-ignore
  const accoun = window.walletConnection.account();
  const { colorMode, toggleColorMode } = useColorMode();
  const getAccount = React.useCallback(() => {
    if (accoun.accountId) {
      setAccount(accoun.accountId);
    }
  }, []);
  useEffect(() => {
    getAccount();
  }, [accoun]);
  return (
    <>
      <VStack p={4} minH="100vh" pb={28}>
        <IconButton
          aria-label="Color Mode"
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
          isRound={true}
          size="md"
          alignSelf="flex-end"
          onClick={toggleColorMode}
        />
        <Heading
          p="5"
          fontWeight="extrabold"
          size="xl"
          bgGradient="linear(to-l, teal.300, blue.500)"
          bgClip="text"
        >
          ArTodo
        </Heading>
        {account ? (
          <>
            <Context>
              <Main />
            </Context>
          </>
        ) : (
          <Login />
        )}
        <>
          <Flex position="absolute" bottom="5">
            <Link href="https://github.com/nativeanish/ArTodo" target="_blank">
              <IconButton
                aria-label="github repos"
                icon={<FaGithub />}
                isRound={true}
                size="md"
                m="1"
              />
            </Link>
          </Flex>
        </>
      </VStack>
    </>
  );
};
export default App;
