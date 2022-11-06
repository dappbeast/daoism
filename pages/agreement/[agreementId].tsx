import { useRouter } from "next/router";
import {
  Text,
  VStack,
  HStack,
  StackDivider,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";

import { useAccount } from "wagmi";
import useAgreement from "../../hooks/useAgreement";

export default function AgreementPage() {
  const { query } = useRouter();
  const router = useRouter();
  const agreementId = parseInt(query.agreementId?.toString() ?? "");

  const { data: agreement, isLoading } = useAgreement(agreementId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!agreement) {
    return <p>Agreement does not exist</p>;
  }

  console.log(agreement);

  return (
    //<div>
    //  <h1>Agreement {agreement.id}</h1>
    //  <Text color="white">{JSON.stringify(agreement)}</Text>
    //</div>

    <VStack mt={30} mb={60} w={"1130px"} spacing={12} alignItems={"flex-start"}>
      <Heading as={"h1"} color={"white"} fontSize={60}>
        Agreement Details
      </Heading>
      <Box>
        <Heading as={"h1"} color={"white"}>
          {agreementId}
        </Heading>

        <VStack
          w={"1130px"}
          mb={30}
          divider={<StackDivider borderColor="gray.200" />}
          spacing={20}
        >
          <HStack w={"100%"} spacing={30}>
            <VStack w={"50%"} alignItems={"flex-start"}>
              <Heading as={"h3"} color={"white"} fontSize={26}>
                Contributor Wallet Address
              </Heading>
              <Text color={"grey"}>{agreement.recipient}</Text>
            </VStack>
            <VStack w={"50%"} alignItems={"flex-start"}>
              <Heading as={"h1"} color={"white"} fontSize={26}>
                Contributor Role
              </Heading>
              <Text color={"grey"}>{agreement.role}</Text>
            </VStack>
          </HStack>

          <VStack w={"100%"} alignItems={"flex-start"} spacing={6}>
            <Heading as={"h3"} color={"white"} fontSize={26}>
              Salary
            </Heading>

            <HStack w={"100%"}>
              <VStack w={"50%"} alignItems={"flex-start"}>
                <Text color={"grey"} fontSize={16} fontWeight={700}>
                  Amount
                </Text>
                <Text color={"grey"}>{agreement.salary}</Text>
              </VStack>
              <VStack w={"50%"} alignItems={"flex-start"}>
                <Text color={"grey"} fontSize={16} fontWeight={700}>
                  Currency
                </Text>
                <Text color={"grey"}>USDC</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack w={"100%"} alignItems={"flex-start"} spacing={6}>
            <Heading as={"h3"} color={"white"} fontSize={26}>
              Duration
            </Heading>

            <HStack w={"100%"}>
              <VStack w={"50%"} alignItems={"flex-start"}>
                <Text color={"grey"} fontSize={16} fontWeight={700}>
                  Start Date
                </Text>
                <Text color={"grey"}>{agreement.startDate}</Text>
              </VStack>
              <VStack w={"50%"} alignItems={"flex-start"}>
                <Text color={"grey"} fontSize={16} fontWeight={700}>
                  End Date
                </Text>
                <Text color={"grey"}>
                  {agreement.endDate === null ? "-" : agreement.endDate}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      <HStack spacing={6}>
        <Button onClick={() => router.back()} borderRadius={30}>
          Return to Dashboard
        </Button>
        <Button borderRadius={30}>Cancel Agreement</Button>
      </HStack>
    </VStack>
  );
}
