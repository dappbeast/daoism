import {
  Text,
  VStack,
  HStack,
  Box,
  Image,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
//import emptyState from "../public/emptyState.svg";
import useDAOs from "../hooks/useDAOs";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Onboarding() {
  const { push } = useRouter();

  const { address } = useAccount();
  const { data: daos } = useDAOs();

  const walletDao = daos.find((d) => d.address === address);

  useEffect(() => {
    if (walletDao) {
      push("/dao/" + walletDao.name);
    }
  }, [push, walletDao]);

  return (
    <VStack
      mt={30}
      mb={60}
      w={"1130px"}
      divider={<StackDivider borderColor="gray.200" />}
      spacing={20}
    >
      <Image src={"/LP_hero.svg"} alt={"DAOism Empty State"} height={"50%"} />
      <HStack spacing={40}>
        <VStack w={"362px"} alignItems={"flex-start"} spacing={6}>
          <Heading as={"h3"} fontSize={30} color={"white"}>
            For DAOs
          </Heading>
          <Text color={"white"} fontSize={22}>
            To set up your DAO to easily pay contributors, connect your DAO
            treasury wallet.
          </Text>
          <Box mt={60}>
            <ConnectButton showBalance={false} />
          </Box>
        </VStack>

        <VStack w={"362px"} alignItems={"flex-start"} spacing={6}>
          <Heading as={"h3"} fontSize={30} color={"white"}>
            For DAO Contributors
          </Heading>
          <Text color={"white"} fontSize={22}>
            To set up your DAO to easily pay contributors, connect your DAO
            treasury wallet.
          </Text>
          <Box mt={60}>
            <ConnectButton showBalance={false} />
          </Box>
        </VStack>
      </HStack>

      <VStack alignItems={"flex-start"} spacing={8}>
        <Heading as={"h3"} fontSize={30} color={"white"}>
          Participating DAOs
        </Heading>
        <Image
          src={"/participatingDAOs.svg"}
          alt={"DAOism Empty State"}
          height={"50%"}
        />
      </VStack>
    </VStack>
  );
}
