import Image from "next/image";
import { useRouter } from "next/router";
import useDAO from "../../hooks/useDAO";
import { Heading, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import AgreementTable from "../../components/AgreementTable";

export default function DAOPage() {
  const { query } = useRouter();
  const daoName = query.daoName?.toString() ?? "";

  const { data: dao, isLoading } = useDAO(daoName);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!dao) {
    return <p>DAO does not exist</p>;
  }

  return (
    //<div>
    //  <h1>{dao.name}</h1>
    //  <Image src={dao.logoUri} alt="Logo" width={120} height={120} />
    //  <h2>Agreements</h2>
    //  {dao.agreements.map((agreement) => (
    //    <Text color={"white"} key={agreement.id}>
    //      ID #{agreement.id} - {agreement.role} - {dao.name} -{" "}
    //      {agreement.recipient}
    //    </Text>
    //  ))}
    //</div>
    <VStack
      mt={20}
      mb={60}
      w={"1130px"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      spacing={10}
    >
      <HStack>
        {/*<Image src={dao.logoUri} alt="Logo" width={120} height={120} />*/}

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
