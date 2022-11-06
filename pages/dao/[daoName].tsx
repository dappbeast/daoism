import Image from "next/image";
import { useRouter } from "next/router";
import useDAO from "../../hooks/useDAO";
import { Heading, HStack, Text, VStack, Flex } from "@chakra-ui/react";

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
    <VStack mt={20}>
      <HStack>
        {/*<Image src={dao.logoUri} alt="Logo" width={120} height={120} />*/}

        <Heading as={"h1"} size={"xl"} color={"white"}>
          {daoName}
        </Heading>
      </HStack>
      <Flex>
        <Heading as={"h3"} size={"md"} color={"whi"}>
          Agreements
        </Heading>
      </Flex>
    </VStack>
  );
}
