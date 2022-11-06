// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components

import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import TablesTableRow from "../TableRow/TablesTableRow";

import React from "react";
import { AgreementInfo } from "../../constants/types";

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
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }} w={"100%"}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={"white"} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="unstyled" color={textColor}>
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
            {/*id: number;
  issuer: string;
  recipient: string;
  role: Role;
  startDate: number;
  endDate: number;
  hashedSalary: string;*/}

            {data.map((agreement: AgreementInfo) => {
              return (
                <TablesTableRow
                  key={agreement.id}
                  recipient={agreement.recipient}
                  role={agreement.role}
                  baseSalary={agreement.hashedSalary}
                  startDate={agreement.startDate}
                  endDate={agreement.endDate}
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
