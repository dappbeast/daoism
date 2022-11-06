import { useRouter } from "next/router";
import useDAO from "../../hooks/useDAO";
import {
  Heading,
  HStack,
  Text,
  VStack,
  Flex,
  Button,
  useDisclosure,
  Box,
  Image,
} from "@chakra-ui/react";
import AgreementTable from "../../components/AgreementTable";

import PasswordModal from "../../components/PasswordModal";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function DAOPage() {
  const { query } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const daoName = query.daoName?.toString() ?? "";

  const { data: dao, isLoading } = useDAO(daoName);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!dao) {
    return <Text color={"white"}>DAO does not exist on the platform</Text>;
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
        {/* TODO: ADD DAO LOGO */}

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
        {dao.agreements.length === 0 ? (
          <VStack
            mb={60}
            w={"1130px"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            spacing={14}
          >
            <Heading as={"h3"} fontSize={40} color={"white"}>
              You have not set up any agreements yet.
            </Heading>

            <Button
              onClick={onOpen}
              color={"white"}
              bg={"none"}
              border={"1px solid white"}
              borderRadius={30}
              isDisabled={dao === null ? true : false}
            >
              Create First Agreement
            </Button>
            <PasswordModal
              dao={dao}
              isOpen={isOpen}
              onClose={onClose}
              address={dao.address}
            />

            <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
              <Image
                mt={12}
                src={"/emptyState.svg"}
                alt={"Empty State"}
                width={"20%"}
                height={"20%"}
              />
            </Flex>
          </VStack>
        ) : (
          <AgreementTable title={"Agreements"} data={dao.agreements} />
        )}
      </VStack>
    </VStack>
  );
}
