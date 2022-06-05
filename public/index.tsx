import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/App";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { initializeContract } from "../src/nearConfig/near";
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
});

const Index = () => {
  return (
    <React.Fragment>
      <App />
    </React.Fragment>
  );
};
const root = ReactDOM.createRoot(
  document.getElementById("mountNode") as HTMLElement
);
initializeContract()
  .then(() => {
    root.render(
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Index />
      </ChakraProvider>
    );
  })
  .catch((err) => console.log(err));
