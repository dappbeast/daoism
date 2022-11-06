import type { AppProps } from "next/app";
import { Flex, ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import Nav from "./Nav";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.optimismGoerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Daoism",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
