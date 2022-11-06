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

  const recipientPrefix =
    agreement?.recipient.substring(0, 6) +
    ".." +
    agreement?.recipient.substring(agreement?.recipient.length - 4);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!agreement) {
    return <p>Agreement does not exist</p>;
  }

  console.log(agreement.startDate);

  const startDate = new Date(
    agreement.startDate * 1000 ?? 0
  ).toLocaleDateString();
  const endDate = new Date(agreement.endDate ?? 0).toLocaleDateString();

  console.log(agreement);

  return (
    <VStack mt={30} mb={60} w={"1130px"} spacing={16} alignItems={"flex-start"}>
      <Heading as={"h1"} color={"white"} fontSize={60}>
        Agreement Details
      </Heading>
      <Box>
        <Heading as={"h1"} color={"white"}>
          ID {agreementId}
        </Heading>

        <VStack
          w={"1130px"}
          mt={8}
          mb={30}
          divider={<StackDivider borderColor="gray.200" />}
          spacing={12}
        >
          <HStack w={"100%"} spacing={30}>
            <VStack w={"50%"} alignItems={"flex-start"}>
              <Heading as={"h3"} color={"white"} fontSize={26}>
                Contributor Wallet Address
              </Heading>
              <Text color={"white"}>{recipientPrefix}</Text>
            </VStack>
            <VStack w={"50%"} alignItems={"flex-start"}>
              <Heading as={"h1"} color={"white"} fontSize={26}>
                Contributor Role
              </Heading>
              <Text color={"white"}>{agreement.role}</Text>
            </VStack>
          </HStack>

          <VStack w={"100%"} alignItems={"flex-start"} spacing={3}>
            <Heading as={"h3"} color={"white"} fontSize={26}>
              Salary
            </Heading>

            <HStack w={"100%"}>
              <VStack w={"50%"} alignItems={"flex-start"} spacing={1}>
                <Text color={"grey"} fontSize={16} fontWeight={700}>
                  Amount
                </Text>
                <Text color={"white"}>
                  {agreement.salary ?? (
                    <>
                      &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                    </>
                  )}
                </Text>
              </VStack>
              <VStack w={"50%"} alignItems={"flex-start"} spacing={1}>
                <Text color={"grey"} fontSize={16} fontWeight={700}>
                  Currency
                </Text>
                <Text color={"white"}>USDC</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack w={"100%"} alignItems={"flex-start"} spacing={3}>
            <Heading as={"h3"} color={"white"} fontSize={26}>
              Duration
            </Heading>

            <HStack w={"100%"}>
              <VStack w={"50%"} alignItems={"flex-start"} spacing={1}>
                <Text color={"grey"} fontSize={16} fontWeight={700}>
                  Start Date
                </Text>
                <Text color={"white"}>{startDate}</Text>
              </VStack>
              <VStack w={"50%"} alignItems={"flex-start"} spacing={1}>
                <Text color={"grey"} fontSize={16} fontWeight={700}>
                  End Date
                </Text>
                <Text color={"white"}>
                  {agreement.endDate === null ? "-" : endDate}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      <HStack spacing={6}>
        <Button
          bg={"#3F3F3F"}
          color={"white"}
          onClick={() =>
            router.push("/dao/" + agreement.dao.name.toLowerCase())
          }
          borderRadius={30}
        >
          Return to Dashboard
        </Button>
        <Button bg={"#FF009B"} color={"white"} borderRadius={30}>
          Cancel Agreement
        </Button>
      </HStack>
    </VStack>
  );
}
