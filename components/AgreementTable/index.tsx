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
//import RevealValuesModal from "../PasswordModal";

interface TableProps {
  title: any;
  captions?: any;
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

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }} w={"100%"}>
      <CardHeader p="6px 0px 16px 0px">
        <HStack justifyContent={"space-between"}>
          <Text fontSize="xl" color={"white"} fontWeight="bold">
            {title}
          </Text>

          <HStack>
            <FormControl display="flex" alignItems="center">
              <FormLabel
                fontWeight={600}
                color={"white"}
                htmlFor="reveal-values"
                mb="0"
              >
                Reveal Values
              </FormLabel>
              {/*<Switch id="reveal-values" onChange={onOpen} isChecked={isOpen} />*/}
            </FormControl>

            <Button px={8} py={4} colorScheme={"pink"} borderRadius={30}>
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
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>

      {/*<RevealValuesModal isOpen={isOpen} onClose={onClose} />*/}
    </Card>
  );
};

export default AgreementTable;
