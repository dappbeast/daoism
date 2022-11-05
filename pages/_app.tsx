import type { AppProps } from "next/app";
import { Flex, ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import Nav from "./Nav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Nav />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}
