import type { AppProps } from "next/app";
import { Flex, ChakraProvider } from "@chakra-ui/react";
import { theme } from "../constants/theme";
import Nav from "../components/Nav";
import "./App.scss";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import NoSSR from "../components/NoSSR";
import { useEffect } from "react";
import {
  LOCAL_STORAGE_AGREEMENT_MAPPING_KEY,
  LOCAL_STORAGE_PASSWORD_MAPPING_KEY,
} from "../constants/localStorage";
import { ADDRESS_SEEDS, SALARY_SEEDS } from "../constants/seed";

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
  useEffect(() => {
    const localStoragePassword = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_PASSWORD_MAPPING_KEY) ?? ""
    );
    localStorage.setItem(
      LOCAL_STORAGE_PASSWORD_MAPPING_KEY,
      JSON.stringify({
        ...localStoragePassword,
        ...ADDRESS_SEEDS,
      })
    );
    const localStorageAgreement = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_AGREEMENT_MAPPING_KEY) ?? ""
    );
    localStorage.setItem(
      LOCAL_STORAGE_AGREEMENT_MAPPING_KEY,
      JSON.stringify({
        ...localStorageAgreement,
        ...SALARY_SEEDS,
      })
    );
  }, []);
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
            <NoSSR>
              <Component {...pageProps} />
            </NoSSR>
          </Flex>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
