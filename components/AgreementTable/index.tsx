// Chakra imports
import {
  Button,
  HStack,
  Switch,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  FormControl,
  FormLabel,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

// Custom components
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import TablesTableRow from "../TableRow/TablesTableRow";

import React, { useState } from "react";
import { AgreementInfo } from "../../constants/types";
import { useRouter } from "next/router";

interface TableProps {
  title: string;
  captions?: string[];
  data: any;
}

const rowHeadings = [
  "Contributor",
  "Role",
  "Base Salary",
  "Start Date",
  "End Date",
];

const AgreementTable = ({
  title,
  captions = rowHeadings,
  data,
}: TableProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }} w={"100%"}>
      <CardHeader p="6px 0px 16px 0px">
        <HStack justifyContent={"space-between"}>
          <Text fontSize="xl" color={"white"} fontWeight="bold">
            {title}
          </Text>

          <HStack>
            <Button
              px={8}
              py={4}
              colorScheme={"pink"}
              borderRadius={30}
              onClick={() => router.push("/create")}
            >
              <Text fontWeight={600} fontSize={16}>
                Create New
              </Text>
            </Button>
          </HStack>
        </HStack>
      </CardHeader>

      <CardBody>
        <Table variant="unstyled" color={textColor} w={"100%"}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption: string, idx: any) => {
                return (
                  <Th color="gray.400" key={idx} px={0}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>

          <Tbody>
            {data.map((agreement: AgreementInfo) => {
              return (
                <TablesTableRow
                  key={agreement.id}
                  recipient={agreement.recipient}
                  role={agreement.role}
                  baseSalary={agreement.salaryHash}
                  startDate={agreement.startDate}
                  endDate={agreement.endDate}
                  agreementId={agreement.id}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default AgreementTable;
