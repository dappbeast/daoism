import { Badge, Heading, HStack, VStack } from "@chakra-ui/layout";
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
  Button,
  Text,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import useDAO from "../../../hooks/useDAO";
import { MdCheck } from "react-icons/md";
import { AgreementInfo, Role } from "../../../constants/types";

export default function ProofPage() {
  const { query } = useRouter();
  const daoName = query.daoName?.toString() ?? "";
  const { data: dao } = useDAO(daoName);

  const agreementsByRole: Record<Role, AgreementInfo[]> = (
    dao?.agreements ?? []
  ).reduce(
    (agreementsByRole, agreement) => ({
      ...agreementsByRole,
      [agreement.role]: [
        ...(agreementsByRole[agreement.role] ?? []),
        agreement,
      ],
    }),
    {} as Record<Role, AgreementInfo[]>
  );

  if (!dao) {
    return null;
  }

  return (
    <VStack
      mt={20}
      mb={60}
      w={"1130px"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      spacing={10}
    >
      <HStack>
        <Heading as={"h1"} fontSize={60} color={"white"}>
          {dao.name}
        </Heading>
      </HStack>
      <VStack
        w={"100%"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        spacing={5}
      >
        <Table variant="unstyled" w={"100%"}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th color="gray.400" px={0}>
                Role
              </Th>
              <Th color="gray.400" px={0}>
                Avg. Salary
              </Th>
              <Th color="gray.400" px={0}>
                Avg. Duration
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(agreementsByRole).map(([role, agreements]) => {
              return (
                <Tr key={role} borderBottom={"1px solid grey"} p={50}>
                  <Td pl="0px" w={"200px"}>
                    <Badge
                      bg={"green.400"}
                      color={"white"}
                      fontSize="16px"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      {role}
                    </Badge>
                  </Td>

                  <Td pl="0px" w={"200px"}>
                    <Flex direction="column">
                      <Text
                        fontSize="md"
                        color={"white"}
                        fontWeight="bold"
                        minWidth="100%"
                      >
                        $
                        {agreements.length
                          ? (
                              agreements.reduce(
                                (sum, agreement) =>
                                  sum + (agreement.salary ?? 0),
                                0
                              ) / agreements.length
                            )
                              .toString()
                              .substring(0, 8)
                          : "0.00"}
                      </Text>
                      <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        USDC Annually
                      </Text>
                    </Flex>
                  </Td>

                  <Td pl="0px" w={"200px"}>
                    <Text
                      fontSize="md"
                      color={"white"}
                      fontWeight="medium"
                      minWidth="100%"
                    >
                      {agreements.length
                        ? (
                            agreements.reduce(
                              (sum, agreement) =>
                                sum +
                                (agreement.endDate ?? Date.now() / 1000) -
                                agreement.startDate,
                              0
                            ) /
                            (agreements.length * 3.154e7)
                          )
                            .toString()
                            .substring(0, 6) + " years"
                        : "0"}
                    </Text>
                  </Td>

                  <Td pl="0px" w={"50px"}>
                    <Button
                      px="14px"
                      py="12px"
                      bg="teal"
                      variant="no-hover"
                      borderRadius={16}
                    >
                      <Icon as={MdCheck} color="white" mr={1} />
                      <Text
                        fontSize="md"
                        color={"white"}
                        fontWeight="bold"
                        cursor="pointer"
                      >
                        See Proof
                      </Text>
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </VStack>
    </VStack>
  );
}
