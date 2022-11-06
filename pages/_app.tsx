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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <svg
              style={{ position: "absolute", top: 0, right: 0 }}
              width="1296"
              height="1139"
              viewBox="0 0 1296 1139"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.22" filter="url(#filter0_f_40_7611)">
                <path
                  d="M417.589 721.595C327.994 632.001 276.86 537.875 380.651 434.084C484.442 330.292 574.788 385.207 664.383 474.802C753.977 564.396 808.892 654.742 705.101 758.533C601.309 862.324 507.183 811.19 417.589 721.595Z"
                  fill="url(#paint0_linear_40_7611)"
                />
              </g>
              <g filter="url(#filter1_f_40_7611)">
                <path
                  d="M1118.67 639.063C1297.62 607.255 1434.62 525.923 1395.72 257.72C1356.81 -10.4824 1205.11 -30.4751 1026.16 1.33294C847.22 33.141 708.799 104.705 747.705 372.907C786.61 641.11 939.73 670.871 1118.67 639.063Z"
                  fill="#FC059C"
                  fillOpacity="0.12"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_40_7611"
                  x="0.996094"
                  y="55.6996"
                  width="1082.49"
                  height="1082.49"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="161"
                    result="effect1_foregroundBlur_40_7611"
                  />
                </filter>
                <filter
                  id="filter1_f_40_7611"
                  x="459.109"
                  y="-292.049"
                  width="1225.25"
                  height="1223.39"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="141"
                    result="effect1_foregroundBlur_40_7611"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_40_7611"
                  x1="703.211"
                  y1="760.423"
                  x2="378.761"
                  y2="435.974"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF46B6" />
                  <stop offset="1" stopColor="#B4FFD9" />
                </linearGradient>
              </defs>
            </svg>

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
