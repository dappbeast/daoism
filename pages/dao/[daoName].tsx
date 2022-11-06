import Image from "next/image";
import { useRouter } from "next/router";
import useDAO from "../../hooks/useDAO";
import { Heading, HStack, Text, VStack, Flex, Button } from "@chakra-ui/react";
import AgreementTable from "../../components/AgreementTable";

export default function DAOPage() {
  const { push, query } = useRouter();
  const daoName = query.daoName?.toString() ?? "";

  const { data: dao, isLoading } = useDAO(daoName);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!dao) {
    return (
      <VStack
        mt={20}
        mb={60}
        w={"1130px"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        spacing={14}
      >
        <Heading as={"h1"} fontSize={60} color={"white"}>
          {daoName}
        </Heading>

        <Heading as={"h3"} fontSize={40} color={"white"}>
          You have not set up any agreements yet.
        </Heading>

        <Button
          onClick={() => {
            push("/create");
          }}
          borderRadius={30}
        >
          Create First Agreement
        </Button>
      </VStack>
    );
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
          {daoName}
        </Heading>
      </HStack>
      <VStack
        w={"100%"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        spacing={5}
      >
        <AgreementTable title={"Agreements"} data={dao.agreements} />
      </VStack>
    </VStack>
  );
}
