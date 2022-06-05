import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { login } from "../nearConfig/near";
const Login = () => {
  return (
    <>
      <Box maxW="80%">
        <Image
          mt="20px"
          w="98%"
          maxW="350"
          src="https://arweave.net/zvscJyMqXG5-I99ToDWxj-Fi_j9daqxl1mmOgcc8EIw"
          alt="Login"
        />
      </Box>

      <Button
        colorScheme="blue"
        px="8"
        pl="10"
        pr="10"
        h="46"
        type="button"
        onClick={() => login()}
      >
        Login
      </Button>
    </>
  );
};
export default Login;
